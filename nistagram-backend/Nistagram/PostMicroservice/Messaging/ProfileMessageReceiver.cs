using Microsoft.Extensions.Hosting;
using Newtonsoft.Json.Linq;
using PostMicroservice.Model;
using PostMicroservice.Service;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace PostMicroservice.Messaging
{
    public class ProfileMessageReceiver : BackgroundService, IProfileMessageReciver
    {
        private IProfileService _profileService;

        public ProfileMessageReceiver(IProfileService profileService)
        {
            _profileService = profileService;
        }

        public void ReceiveMessage()
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

                var consumer = new EventingBasicConsumer(channel);
                consumer.Received += (model, ea) =>
                {
                    var body = ea.Body.ToArray();
                    var message = Encoding.UTF8.GetString(body);
                    Console.WriteLine(" [x] Received {0}", message);

                    var data = JObject.Parse(message);
                    _profileService.Insert(new Profile()
                    {
                        OriginalId = data["id"].Value<int>(),
                        Name = data["name"].Value<string>()
                    });

                    channel.BasicAck(ea.DeliveryTag, false);
                };
                channel.BasicConsume(queue: "profile.created",
                                     autoAck: false,
                                     consumer: consumer);
            }
        }

        protected override Task ExecuteAsync(CancellationToken stoppingToken)
        {
            ReceiveMessage();
            return Task.CompletedTask;
        }
    }
}
