using Microsoft.Extensions.Hosting;
using Newtonsoft.Json.Linq;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using PostMicroservice.Model;
using PostMicroservice.Service;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace PostMicroservice.Messaging
{
    public class ProfileUpdatedMessageReceiver : BackgroundService, IMessageReceiver
    {
        private IProfileService _profileService;
        private IConnection _connection;
        private IModel _channel;

        public ProfileUpdatedMessageReceiver(IProfileService profileService)
        {
            _profileService = profileService;
            InitRabbitMQ();
        }

        private void InitRabbitMQ()
        {
            var hostName = Environment.GetEnvironmentVariable("RABBITMQ_HOST_NAME") ?? "localhost";
            var factory = new ConnectionFactory()
            {
                HostName = hostName,
                Port = 5672,
                UserName = "guest",
                Password = "guest"
            };

            _connection = factory.CreateConnection();
            _channel = _connection.CreateModel();
            _channel.ExchangeDeclare(exchange: "profile.updated", type: ExchangeType.Fanout);
            _channel.QueueDeclare(queue: "post.profile.updated",
                                  durable: false,
                                  exclusive: false,
                                  autoDelete: false,
                                  arguments: null);
            _channel.QueueBind(queue: "post.profile.updated",
                              exchange: "profile.updated",
                              routingKey: "");
        }

        public void ReceiveMessage()
        {

            var consumer = new EventingBasicConsumer(_channel);
            consumer.Received += (model, ea) =>
            {
                var body = ea.Body.ToArray();
                var message = Encoding.UTF8.GetString(body);
                Console.WriteLine(" [x] Received {0}", message);

                var data = JObject.Parse(message);
                _profileService.Update(new Profile()
                {
                    OriginalId = data["id"].Value<int>(),
                    Username = data["username"].Value<string>(),
                    IsPrivate = data["isPrivate"].Value<bool>(),
                    Following = data["following"].ToObject<List<int>>(),
                    ImageName = data["profileImage"].Value<string>()
                });

                _channel.BasicAck(deliveryTag: ea.DeliveryTag, multiple: false);
            };

            _channel.BasicConsume(queue: "post.profile.updated",
                                  autoAck: false,
                                  consumer: consumer);
        }

        protected override Task ExecuteAsync(CancellationToken stoppingToken)
        {
            stoppingToken.ThrowIfCancellationRequested();
            ReceiveMessage();
            return Task.CompletedTask;
        }
    }
}
