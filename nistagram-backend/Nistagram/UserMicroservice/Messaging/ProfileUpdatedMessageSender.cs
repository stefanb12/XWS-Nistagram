using Newtonsoft.Json;
using ProfileMicroservice.Model;
using RabbitMQ.Client;
using System;
using System.Collections.Generic;
using System.Text;
using UserMicroservice.Model;

namespace UserMicroservice.Messaging
{
    public class ProfileUpdatedMessageSender : IProfileUpdatedMessageSender
    {
        public ProfileUpdatedMessageSender() { }

        public void SendUpdatedProfile(Profile profile)
        {
            var hostName = Environment.GetEnvironmentVariable("RABBITMQ_HOST_NAME") ?? "localhost";
            var factory = new ConnectionFactory()
            {
                HostName = "host.docker.internal",
                Port = 5672,
                UserName = "guest",
                Password = "guest"
            };

            var connection = factory.CreateConnection();
            var channel = connection.CreateModel();
 
            channel.ExchangeDeclare(exchange: "profile.updated", type: ExchangeType.Fanout);

            List<int> followingIds = new List<int>();
            if (profile.Following != null)
            {
                foreach (ProfileFollowing followed in profile.Following)
                {
                    followingIds.Add(followed.FollowingId);
                }
            }

            List<int> closeFriendsIds = new List<int>();
            if (profile.CloseFriends != null)
            {
                foreach (ProfileCloseFriend closeFriend in profile.CloseFriends)
                {
                    closeFriendsIds.Add(closeFriend.CloseFriendId);
                }
            }

            List<int> blockedProfilesIds = new List<int>();
            if (profile.ProfileSettings.BlockedProfiles != null)
            {
                foreach (ProfileBlockedProfile blockedProfile in profile.ProfileSettings.BlockedProfiles)
                {
                    blockedProfilesIds.Add(blockedProfile.BlockedProfileId);
                }
            }

            List<int> mutedProfilesIds = new List<int>();
            if (profile.ProfileSettings.MutedProfiles != null)
            {
                foreach (ProfileMutedProfile mutedProfile in profile.ProfileSettings.MutedProfiles)
                {
                    mutedProfilesIds.Add(mutedProfile.MutedProfileId);
                }
            }

            List<int> notificationProfilesIds = new List<int>();
            if (profile.ProfileSettings.NotificationProfiles != null)
            {
                foreach (ProfileNotificationProfile notificationProfile in profile.ProfileSettings.NotificationProfiles)
                {
                    notificationProfilesIds.Add(notificationProfile.NotificationProfileId);
                }
            }

            var integrationEventData = JsonConvert.SerializeObject(new
            {
                id = profile.Id,
                username = profile.Username,
                isPrivate = profile.IsPrivate,
                deactivated = profile.Deactivated,
                profileImage = profile.ImageName,
                following = followingIds,
                closeFriends = closeFriendsIds,
                blockedProfiles = blockedProfilesIds,
                mutedProfiles = mutedProfilesIds,
                notificationProfiles = notificationProfilesIds
            });

            var body = Encoding.UTF8.GetBytes(integrationEventData);

            channel.BasicPublish(exchange: "profile.updated",
                                    routingKey: "",
                                    basicProperties: null,
                                    body: body);
        }
    }
}
