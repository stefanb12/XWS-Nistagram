using Newtonsoft.Json;
using ProfileMicroservice.Model;
using RabbitMQ.Client;
using System;
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
            var hostName = Environment.GetEnvironmentVariable("RABBITMQ_HOST_NAME") ?? "localhost";
            var factory = new ConnectionFactory() { HostName = "localhost" };
            if (hostName == "rabbitmq")
            {
                factory = new ConnectionFactory()
                {
                    HostName = hostName,
                    Port = 5672,
                    UserName = "guest",
                    Password = "guest"
                };
            }

            var connection = factory.CreateConnection();
            var channel = connection.CreateModel();
            
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
