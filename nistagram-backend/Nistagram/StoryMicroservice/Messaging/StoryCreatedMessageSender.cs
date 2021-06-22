using Newtonsoft.Json;
using RabbitMQ.Client;
using StoryMicroservice.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StoryMicroservice.Messaging
{
    public class StoryCreatedMessageSender : IStoryCreatedMessageSender
    {
        public StoryCreatedMessageSender() { }

        public void SendCreatedStory(Story story)
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

            channel.ExchangeDeclare(exchange: "story.created", type: ExchangeType.Fanout);

            var integrationEventData = JsonConvert.SerializeObject(new
            {
                originalId = story.Id,
                image = story.ImageName
            });

            var body = Encoding.UTF8.GetBytes(integrationEventData);

            channel.BasicPublish(exchange: "story.created",
                                    routingKey: "",
                                    basicProperties: null,
                                    body: body);

        }
    }
}
