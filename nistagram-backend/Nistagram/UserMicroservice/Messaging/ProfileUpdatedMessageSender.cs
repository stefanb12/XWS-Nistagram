using Newtonsoft.Json;
using ProfileMicroservice.Model;
using RabbitMQ.Client;
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
            var factory = new ConnectionFactory() { HostName = "localhost" };
            using (var connection = factory.CreateConnection())
            using (var channel = connection.CreateModel())
            {
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

                var integrationEventData = JsonConvert.SerializeObject(new
                {
                    id = profile.Id,
                    username = profile.Username,
                    isPrivate = profile.IsPrivate,
                    following = followingIds,
                    profileImage = profile.ImageName,
                    closeFriends = closeFriendsIds
                });

                var body = Encoding.UTF8.GetBytes(integrationEventData);

                channel.BasicPublish(exchange: "profile.updated",
                                     routingKey: "",
                                     basicProperties: null,
                                     body: body);
            }
        }
    }
}
