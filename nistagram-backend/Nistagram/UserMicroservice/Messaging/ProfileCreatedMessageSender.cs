using Newtonsoft.Json;
using ProfileMicroservice.Model;
using RabbitMQ.Client;
using System.Collections.Generic;
using System.Text;
using UserMicroservice.Model;

namespace UserMicroservice.Messaging
{
    public class ProfileCreatedMessageSender : IProfileCreatedMessageSender
    {
        public ProfileCreatedMessageSender() { }

        public void SendCreatedProfile(Profile profile)
        {
            var factory = new ConnectionFactory() { HostName = "localhost" };
            using (var connection = factory.CreateConnection())
            using (var channel = connection.CreateModel())
            {
                channel.ExchangeDeclare(exchange: "profile.created", type: ExchangeType.Fanout);

                var integrationEventData = JsonConvert.SerializeObject(new
                {
                    id = profile.Id,
                    username = profile.Username,
                    isPrivate = profile.IsPrivate,
                    profileImage = profile.ImageName
                });

                var body = Encoding.UTF8.GetBytes(integrationEventData);

                channel.BasicPublish(exchange: "profile.created",
                                     routingKey: "",
                                     basicProperties: null,
                                     body: body);
            }
        }
    }
}
