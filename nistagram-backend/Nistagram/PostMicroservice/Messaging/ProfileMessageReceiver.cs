using Microsoft.Extensions.Hosting;
using Newtonsoft.Json.Linq;
using PostMicroservice.Model;
using PostMicroservice.Service;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace PostMicroservice.Messaging
{
    public class ProfileMessageReceiver : BackgroundService, IProfileMessageReciver
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
            _channel.QueueDeclare(queue: "profile.created",
                                  durable: false,
                                  exclusive: false,
                                  autoDelete: false,
                                  arguments: null);
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

            _channel.BasicConsume(queue: "profile.created",
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
