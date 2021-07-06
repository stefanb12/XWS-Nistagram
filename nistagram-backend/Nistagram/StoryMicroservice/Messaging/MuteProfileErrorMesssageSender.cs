using Newtonsoft.Json;
using RabbitMQ.Client;
using StoryMicroservice.Model;
using System;
using System.Text;

namespace StoryMicroservice.Messaging
{
    public class MuteProfileErrorMesssageSender : IMuteProfileErrorMesssageSender
    {
        public MuteProfileErrorMesssageSender() { }

        public void SendMuteProfileError(int profileId, int muteProfileId)
        {
            var hostName = Environment.GetEnvironmentVariable("RABBITMQ_HOST_NAME") ?? "localhost";
            if (hostName.Equals("rabbitmq"))
            {
                hostName = "host.docker.internal";
            }
            var factory = new ConnectionFactory()
            {
                HostName = hostName,
                Port = 5672,
                UserName = "guest",
                Password = "guest"
            };

            var connection = factory.CreateConnection();
            var channel = connection.CreateModel();

            channel.ExchangeDeclare(exchange: "profile.mute.error", type: ExchangeType.Fanout);

            var integrationEventData = JsonConvert.SerializeObject(new
            {
                profileId = profileId,
                muteProfileId = muteProfileId
            });

            var body = Encoding.UTF8.GetBytes(integrationEventData);

            channel.BasicPublish(exchange: "profile.mute.error",
                                    routingKey: "",
                                    basicProperties: null,
                                    body: body);
        }
    }
}
