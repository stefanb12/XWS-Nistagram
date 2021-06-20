using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Newtonsoft.Json.Linq;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using StoryMicroservice.Model;
using StoryMicroservice.Service;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace StoryMicroservice.Messaging
{
    public class ProfileUpdatedMessageReceiver : IHostedService, IMessageReceiver
    {
        private IConnection _connection;
        private IModel _channel;
        public IServiceProvider Services;

        public ProfileUpdatedMessageReceiver(IServiceProvider services)
        {
            Services = services;
            InitRabbitMQ();
        }

        private void InitRabbitMQ()
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

            _connection = factory.CreateConnection();
            _channel = _connection.CreateModel();
            _channel.ExchangeDeclare(exchange: "profile.updated", type: ExchangeType.Fanout);
            _channel.QueueDeclare(queue: "story.profile.updated",
                                  durable: false,
                                  exclusive: false,
                                  autoDelete: false,
                                  arguments: null);
            _channel.QueueBind(queue: "story.profile.updated",
                              exchange: "profile.updated",
                              routingKey: "");
        }

        public void ReceiveMessage()
        {

            var consumer = new EventingBasicConsumer(_channel);
            var scope = Services.CreateScope();
            consumer.Received += (model, ea) =>
            {
                var body = ea.Body.ToArray();
                var message = Encoding.UTF8.GetString(body);
                Console.WriteLine(" [x] Received {0}", message);

                var data = JObject.Parse(message);

                var scopedProcessingService =
                    scope.ServiceProvider
                        .GetRequiredService<IProfileService>();

                scopedProcessingService.Update(new Profile()
                {
                    OriginalId = data["id"].Value<int>(),
                    Username = data["username"].Value<string>(),
                    IsPrivate = data["isPrivate"].Value<bool>(),
                    Following = data["following"].ToObject<List<int>>(),
                    ImageName = data["profileImage"].Value<string>(),
                    CloseFriends = data["closeFriends"].ToObject<List<int>>(),
                    MutedProfiles = data["mutedProfiles"].ToObject<List<int>>()
                });

                _channel.BasicAck(deliveryTag: ea.DeliveryTag, multiple: false);
            };

            _channel.BasicConsume(queue: "story.profile.updated",
                                  autoAck: false,
                                  consumer: consumer);
        }

        public Task StartAsync(CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();
            ReceiveMessage();
            return Task.CompletedTask;
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}
