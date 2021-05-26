using Microsoft.IdentityModel.Tokens;
using ProfileMicroservice.Model;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using UserMicroservice.Model;
using UserMicroservice.Repository;

namespace UserMicroservice.Service
{
    public class ProfileService : IProfileService
    {
        private IProfileRepository _profileRepository;

        public ProfileService(IProfileRepository userRepository)
        {
            _profileRepository = userRepository;
        }

        public async Task<List<Profile>> GetFollowers(int id)
        {
            Profile profile = await _profileRepository.GetById(id);
            List<Profile> followers = new List<Profile>();
            foreach(ProfileFollower profileFollower in profile.Followers)
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
            return await _profileRepository.Insert(entity);
        }

        public async Task<Profile> Update(Profile entity)
        {
            await _profileRepository.Update(entity);
            return entity;
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
    }
}
