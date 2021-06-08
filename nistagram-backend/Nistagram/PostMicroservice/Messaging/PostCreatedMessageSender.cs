﻿using Newtonsoft.Json;
using PostMicroservice.Model;
using RabbitMQ.Client;
using System;
using System.Text;
namespace PostMicroservice.Messaging
{
    public class PostCreatedMessageSender : IPostCreatedMessageSender
    {
        public PostCreatedMessageSender() { }

        public void SendCreatedPost(Post post)
        {
            var hostName = Environment.GetEnvironmentVariable("RABBITMQ_HOST_NAME") ?? "localhost";
            var factory = new ConnectionFactory()
            {
                HostName = hostName,
                Port = 5672,
                UserName = "guest",
                Password = "guest"
            };

            using (var connection = factory.CreateConnection())
            using (var channel = connection.CreateModel())
            {
                channel.ExchangeDeclare(exchange: "post.created", type: ExchangeType.Fanout);

                var integrationEventData = JsonConvert.SerializeObject(new
                {
                    originalId = post.Id,
                    profileImage = post.Contents[0]
                });

                var body = Encoding.UTF8.GetBytes(integrationEventData);

                channel.BasicPublish(exchange: "post.created",
                                     routingKey: "",
                                     basicProperties: null,
                                     body: body);
            }
        }
    }
}
