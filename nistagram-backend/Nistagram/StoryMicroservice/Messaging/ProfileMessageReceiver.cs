using Microsoft.Extensions.Hosting;
using Newtonsoft.Json.Linq;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using StoryMicroservice.Model;
using StoryMicroservice.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace StoryMicroservice.Messaging
{
    public class ProfileMessageReceiver : BackgroundService, IProfileMessageReceiver
    {
        private IProfileService _profileService;
        private IConnection _connection;
        private IModel _channel;

        public ProfileMessageReceiver(IProfileService profileService)
        {
            _profileService = profileService;
            InitRabbitMQ();
        }

        private void InitRabbitMQ()
        {
            var factory = new ConnectionFactory { HostName = "localhost" };

            _connection = factory.CreateConnection();
            _channel = _connection.CreateModel();
            _channel.ExchangeDeclare(exchange: "profile", type: ExchangeType.Fanout);
            _channel.QueueDeclare(queue: "story.profile.created",
                                  durable: false,
                                  exclusive: false,
                                  autoDelete: false,
                                  arguments: null);
            _channel.QueueBind(queue: "story.profile.created",
                              exchange: "profile",
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
                _profileService.Insert(new Profile()
                {
                    OriginalId = data["id"].Value<int>(),
                    Username = data["username"].Value<string>(),
                });

                _channel.BasicAck(deliveryTag: ea.DeliveryTag, multiple: false);
            };

            _channel.BasicConsume(queue: "story.profile.created",
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
