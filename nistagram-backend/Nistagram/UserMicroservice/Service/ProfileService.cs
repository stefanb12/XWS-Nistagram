using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.IdentityModel.Tokens;
using ProfileMicroservice.Model;
using ProfileMicroservice.Model.Enum;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using UserMicroservice.Email;
using UserMicroservice.Messaging;
using UserMicroservice.Model;
using UserMicroservice.Repository;

namespace UserMicroservice.Service
{
    public class ProfileService : IProfileService
    {
        private IProfileRepository _profileRepository;
        private IProfileSettingsRepository _profileSettingsRepository;
        private IProfileCreatedMessageSender _profileCreatedSender;
        private IProfileUpdatedMessageSender _profileUpdatedSender;
        private IEmailSender _emailSender;

        public ProfileService(IProfileRepository userRepository, IProfileSettingsRepository profileSettingsRepository, 
                              IProfileCreatedMessageSender profileCreatedSender, IProfileUpdatedMessageSender profileUpdatedSender, 
                              IEmailSender emailSender)
        {
            _profileRepository = userRepository;
            _profileSettingsRepository = profileSettingsRepository;
            _profileCreatedSender = profileCreatedSender;
            _profileUpdatedSender = profileUpdatedSender;
            _emailSender = emailSender;
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

            _profileUpdatedSender.SendUpdatedProfile(followerProfile);
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

            _profileUpdatedSender.SendUpdatedProfile(followerProfile);

            ProfileFollower res = new ProfileFollower();
            res.Profile = followingProfile;
            res.Follower = followerProfile;
            return res;
        }

        public async Task<Profile> SetProfileCategory(int profileId, UserCategory userCategory)
        {
            Profile profile = await GetById(profileId);
            profile.Category = userCategory;
            return await _profileRepository.Update(profile);
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

            if (!user.Deactivated)
            {
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
            }

            return user;
        }

        public async Task<List<Profile>> GetMutedProfiles(int id)
        {
            ProfileSettings profileSettings = await _profileSettingsRepository.GetById(id);
            List<Profile> mutedProfiles = new List<Profile>();
            foreach (ProfileMutedProfile profileMutedProfile in profileSettings.MutedProfiles)
            {
                mutedProfiles.Add(profileMutedProfile.MutedProfile);
            }

            return mutedProfiles;
        }

        public async Task<ProfileMutedProfile> MuteProfile(int profileId, int id)
        {
            ProfileSettings profile = await _profileSettingsRepository.GetById(profileId);
            ProfileSettings muteProfile = await _profileSettingsRepository.GetById(id);
            if (profile == null || muteProfile == null)
            {
                return null;
            }
            ProfileMutedProfile profileMutedProfile = new ProfileMutedProfile();
            profileMutedProfile.MutedProfileId = muteProfile.Id;
            profileMutedProfile.ProfileSettingsId = profile.Id;
            profile.MutedProfiles.Add(profileMutedProfile);
            await _profileSettingsRepository.Update(profile);

            _profileUpdatedSender.SendUpdatedProfile(await GetById(profileId));

            return profileMutedProfile;
        }

        public async Task<ProfileMutedProfile> UnmuteProfile(int profileId, int id)
        {
            ProfileSettings profile = await _profileSettingsRepository.GetById(profileId);
            ProfileSettings muteProfile = await _profileSettingsRepository.GetById(id);
            if (profile == null || muteProfile == null)
            {
                return null;
            }
            ProfileMutedProfile profileMutedProfile = profile.MutedProfiles.Where(ps =>
                ps.MutedProfileId == muteProfile.Id).SingleOrDefault();
            profile.MutedProfiles.Remove(profileMutedProfile);
            await _profileSettingsRepository.Update(profile);

            _profileUpdatedSender.SendUpdatedProfile(await GetById(profileId));

            return profileMutedProfile;
        }

        public async Task<List<Profile>> GetBlockedProfiles(int id)
        {
            ProfileSettings profileSettings = await _profileSettingsRepository.GetById(id);
            List<Profile> blockedProfiles = new List<Profile>();
            foreach (ProfileBlockedProfile profileBlockedProfile in profileSettings.BlockedProfiles)
            {
                blockedProfiles.Add(profileBlockedProfile.BlockedProfile);
            }

            return blockedProfiles;
        }

        public async Task<ProfileBlockedProfile> BlockProfile(int profileId, int id)
        {
            ProfileSettings profile = await _profileSettingsRepository.GetById(profileId);
            ProfileSettings blockProfile = await _profileSettingsRepository.GetById(id);
            if (profile == null || blockProfile == null)
            {
                return null;
            }
            ProfileBlockedProfile profileBlockedProfile = new ProfileBlockedProfile();
            profileBlockedProfile.BlockedProfileId = blockProfile.Id;
            profileBlockedProfile.ProfileSettingsId = profile.Id;
            profile.BlockedProfiles.Add(profileBlockedProfile);
            if(await DoesExistInFollowing(profileId, id))
            {
                await UnfollowAnotherProfile(profileId, id);
            }
            await _profileSettingsRepository.Update(profile);

            _profileUpdatedSender.SendUpdatedProfile(await GetById(profileId));

            return profileBlockedProfile;
        }

        private async Task<bool> DoesExistInFollowing(int profileId, int id)
        {
            Profile profile = await GetById(profileId);
            if(profile.Following.Exists(pf => pf.FollowingId == id))
            {
                return true;
            }
            return false;
        }

        public async Task<ProfileBlockedProfile> UnBlockProfile(int profileId, int id)
        {
            ProfileSettings profile = await _profileSettingsRepository.GetById(profileId);
            ProfileSettings muteProfile = await _profileSettingsRepository.GetById(id);
            if (profile == null || muteProfile == null)
            {
                return null;
            }
            ProfileBlockedProfile profileBlockedProfile = profile.BlockedProfiles.Where(ps =>
                ps.BlockedProfileId == muteProfile.Id).SingleOrDefault();
            profile.BlockedProfiles.Remove(profileBlockedProfile);
            await _profileSettingsRepository.Update(profile);

            _profileUpdatedSender.SendUpdatedProfile(await GetById(profileId));

            return profileBlockedProfile;
        }

        public async Task<List<Profile>> GetCloseFriends(int id)
        {
            Profile profile = await GetById(id);
            List<Profile> closeFriends = new List<Profile>();
            foreach (ProfileCloseFriend profileCloseFriend in profile.CloseFriends)
            {
                closeFriends.Add(profileCloseFriend.CloseFriend);
            }

            return closeFriends;
        }

        public async Task<ProfileCloseFriend> AddCloseFriend(int profileId, int id)
        {
            Profile profile = await GetById(profileId);
            Profile closeFriend = await GetById(id);
            if (profile == null || closeFriend == null)
            {
                return null;
            }
            ProfileCloseFriend profileCloseFriend = new ProfileCloseFriend();
            profileCloseFriend.CloseFriendId = closeFriend.Id;
            profileCloseFriend.ProfileId = profile.Id;
            profile.CloseFriends.Add(profileCloseFriend);
            await Update(profile);

            _profileUpdatedSender.SendUpdatedProfile(profile);

            return profileCloseFriend;
        }

        public async Task<ProfileCloseFriend> RemoveCloseFriend(int profileId, int id)
        {
            Profile profile = await GetById(profileId);
            Profile closeFriend = await GetById(id);
            if (profile == null || closeFriend == null)
            {
                return null;
            }
            ProfileCloseFriend profileCloseFriend = profile.CloseFriends.Where(p =>
                p.CloseFriendId == closeFriend.Id).SingleOrDefault();
            profile.CloseFriends.Remove(profileCloseFriend);
            await Update(profile);

            _profileUpdatedSender.SendUpdatedProfile(profile);

            return profileCloseFriend;
        }

        public async Task<List<Profile>> GetNotificationProfiles(int id)
        {
            ProfileSettings profileSettings = await _profileSettingsRepository.GetById(id);
            List<Profile> notificationProfiles = new List<Profile>();
            foreach (ProfileNotificationProfile profileNotificationProfile in profileSettings.NotificationProfiles)
            {
                notificationProfiles.Add(profileNotificationProfile.NotificationProfile);
            }

            return notificationProfiles;
        }

        public async Task<ProfileNotificationProfile> AddNotificationProfile(int profileId, int id)
        {
            ProfileSettings profile = await _profileSettingsRepository.GetById(profileId);
            ProfileSettings notificationProfile = await _profileSettingsRepository.GetById(id);
            if (profile == null || notificationProfile == null)
            {
                return null;
            }
            ProfileNotificationProfile profileNotificationProfile = new ProfileNotificationProfile();
            profileNotificationProfile.NotificationProfileId = notificationProfile.Id;
            profileNotificationProfile.ProfileSettingsId = profile.Id;
            profile.NotificationProfiles.Add(profileNotificationProfile);
            await _profileSettingsRepository.Update(profile);

            _profileUpdatedSender.SendUpdatedProfile(await GetById(profileId));

            return profileNotificationProfile;
        }

        public async Task<ProfileNotificationProfile> RemoveNotificationProfile(int profileId, int id)
        {
            ProfileSettings profile = await _profileSettingsRepository.GetById(profileId);
            ProfileSettings notificationProfile = await _profileSettingsRepository.GetById(id);
            if (profile == null || notificationProfile == null)
            {
                return null;
            }
            ProfileNotificationProfile profileNotificationProfile = profile.NotificationProfiles.Where(ps =>
                ps.NotificationProfileId == notificationProfile.Id).SingleOrDefault();
            profile.NotificationProfiles.Remove(profileNotificationProfile);
            await _profileSettingsRepository.Update(profile);

            _profileUpdatedSender.SendUpdatedProfile(await GetById(profileId));

            return profileNotificationProfile;
        }

        public async Task<ProfileSettings> GetProfileSettingsById(int id)
        {
            return await _profileSettingsRepository.GetById(id);
        }

        public async Task<ProfileSettings> UpdateProfileSettings(ProfileSettings entity, int profileId)
        {
            ProfileSettings profileSettings = await _profileSettingsRepository.Update(entity);
            _profileUpdatedSender.SendUpdatedProfile(await GetById(profileId));
            return profileSettings;
        }

        public async Task<Profile> ActivateAgentProfile(int agentProfileId)
        {
            Profile entity = await _profileRepository.GetById(agentProfileId);
            entity.Deactivated = false;
            Profile agent = await Update(entity);
            if (agent != null)
            {
                _emailSender.SendRegistrationRequestAcceptanceEmail(agent.Email, agent.Username);
            }
            return agent;
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
