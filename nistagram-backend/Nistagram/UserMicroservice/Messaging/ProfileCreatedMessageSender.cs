using Newtonsoft.Json;
using ProfileMicroservice.Model;
using RabbitMQ.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UserMicroservice.Messaging
{
    public class ProfileCreatedMessageSender : IProfileCreatedMessageSender
    {
        public ProfileCreatedMessageSender()
        {

        }

        public void SendCreatedProfile(Profile profile)
        {
            var factory = new ConnectionFactory() { HostName = "localhost" };
            using (var connection = factory.CreateConnection())
            using (var channel = connection.CreateModel())
            {
                channel.QueueDeclare(queue: "profile.created",
                                     durable: false,
                                     exclusive: false,
                                     autoDelete: false,
                                     arguments: null);

                var integrationEventData = JsonConvert.SerializeObject(new
                {
                    id = profile.Id,
                    username = profile.Username,
                });

                var body = Encoding.UTF8.GetBytes(integrationEventData);

                channel.BasicPublish(exchange: "",
                                     routingKey: "profile.created",
                                     basicProperties: null,
                                     body: body);
            }
        }
    }
}
