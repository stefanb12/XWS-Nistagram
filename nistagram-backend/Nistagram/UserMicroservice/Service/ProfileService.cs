using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.IdentityModel.Tokens;
using ProfileMicroservice.Model;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using UserMicroservice.Messaging;
using UserMicroservice.Model;
using UserMicroservice.Repository;

namespace UserMicroservice.Service
{
    public class ProfileService : IProfileService
    {
        private IProfileRepository _profileRepository;
        private IProfileCreatedMessageSender _profileCreatedSender;
        private IProfileUpdatedMessageSender _profileUpdatedSender;

        public ProfileService(IProfileRepository userRepository, IProfileCreatedMessageSender profileCreatedSender, IProfileUpdatedMessageSender profileUpdatedSender)
        {
            _profileRepository = userRepository;
            _profileCreatedSender = profileCreatedSender;
            _profileUpdatedSender = profileUpdatedSender;
        }

        public async Task<List<Profile>> GetFollowers(int id)
        {
            Profile profile = await _profileRepository.GetById(id);
            List<Profile> followers = new List<Profile>();
            foreach (ProfileFollower profileFollower in profile.Followers)
            {
                followers.Add(profileFollower.Follower);
            }

            return followers;
        }

        public async Task<List<Profile>> GetFollowingProfiles(int id)
        {
            Profile profile = await _profileRepository.GetById(id);
            List<Profile> followingProfiles = new List<Profile>();
            foreach (ProfileFollowing profileFollowing in profile.Following)
            {
                followingProfiles.Add(profileFollowing.Following);
            }
                
            return followingProfiles;
        }

        public async Task<bool> DoesProfileFollowAnotherProfile(int profileId, int id)
        {
            List<Profile> followingProfiles = await GetFollowingProfiles(profileId);
            if (followingProfiles.Contains(await _profileRepository.GetById(id)))
            {
                return true;
            }
            return false;
        }

        public async Task<ProfileFollower> FollowAnotherProfile(int profileId, int id)
        {
            Profile followerProfile = await GetById(profileId);
            Profile followingProfile = await GetById(id);
            if (followerProfile == null || followingProfile == null)
            {
                return null;
            }
            ProfileFollower profileFollower = new ProfileFollower();
            profileFollower.ProfileId = followingProfile.Id;
            profileFollower.FollowerId = followerProfile.Id;
            followingProfile.Followers.Add(profileFollower);
            await Update(followerProfile);

            ProfileFollowing profileFollowing = new ProfileFollowing();
            profileFollowing.ProfileId = followerProfile.Id;
            profileFollowing.FollowingId = followingProfile.Id;
            followerProfile.Following.Add(profileFollowing);
            await Update(followingProfile);

            _profileUpdatedSender.SendUpdatedProfile(followingProfile);
            return profileFollower;
        }

        public async Task<ProfileFollower> UnfollowAnotherProfile(int profileId, int id)
        {
            Profile followerProfile = await GetById(profileId);
            Profile followingProfile = await GetById(id);
            if (followerProfile == null || followingProfile == null)
            {
                return null;
            }
            ProfileFollower profileFollower = followingProfile.Followers.Where(pf =>
                pf.ProfileId == followingProfile.Id &&
                pf.FollowerId == followerProfile.Id).SingleOrDefault();
            followingProfile.Followers.Remove(profileFollower);
            await Update(followerProfile);

            ProfileFollowing profileFollowing = followerProfile.Following.Where(profileFollowing =>
                profileFollowing.ProfileId == followerProfile.Id &&
                profileFollowing.FollowingId == followingProfile.Id).SingleOrDefault();
            followerProfile.Following.Remove(profileFollowing);
            await Update(followingProfile);

            _profileUpdatedSender.SendUpdatedProfile(followingProfile);

            ProfileFollower res = new ProfileFollower();
            res.Profile = followingProfile;
            res.Follower = followerProfile;
            return res;
        }

        public async Task<Profile> GetById(int id)
        {
            return await _profileRepository.GetById(id);
        }

        public async Task<IEnumerable<Profile>> GetAll()
        {
            return await _profileRepository.GetAll();
        }

        public async Task<Profile> Insert(Profile entity)
        {
            IEnumerable<Profile> profiles = await GetAll();
            if (!profiles.ToList().Any(p => p.Username.Equals(entity.Username)))
            {
                Profile profile = await _profileRepository.Insert(entity);
                _profileCreatedSender.SendCreatedProfile(profile);
                return profile;
            }
            return null;
        }

        public async Task<Profile> Update(Profile entity)
        {
            return await _profileRepository.Update(entity);
        }

        public async Task<Profile> UpdateWithImage(Profile entity, IFormFile imageFile)
        {
            if(imageFile != null)
            {
                entity.ImageName = await SaveImage(imageFile);
            }

            Profile profile = await _profileRepository.Update(entity);
            _profileUpdatedSender.SendUpdatedProfile(profile);
            return profile;
        }

        public bool DoesUsernameExist(String username, IEnumerable<Profile> profiles)
        {
            foreach (Profile profile in profiles)
            {
                if (profile.Username.Equals(username))
                    return true;
            }
            return false;
        }

        public async Task Delete(Profile entity)
        {
            await _profileRepository.Delete(entity);
        }

        public async Task<User> Authenticate(string username, string password, byte[] secretKey)
        {
            var users = await _profileRepository.GetAll();
            Profile user = users.ToList().SingleOrDefault(user => user.Username == username && user.Password == password);

            if (user == null)
            {
                return null;
            }

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = secretKey;
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.Id.ToString()),
                    new Claim("UserRole", user.UserRole.ToString())
                }),
                Expires = DateTime.UtcNow.AddHours(3),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            user.Token = tokenHandler.WriteToken(token);

            return user;
        }

        public async Task<string> SaveImage(IFormFile imageFile)
        {
            string imageName = new String(Path.GetFileNameWithoutExtension(imageFile.FileName).Take(10).ToArray()).Replace(' ', '-');
            imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(imageFile.FileName);
            var imagePath = Path.Combine("wwwroot", imageName);
            using (var fileStream = new FileStream(imagePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(fileStream);
            }
            return imageName;
        }
    }
}
