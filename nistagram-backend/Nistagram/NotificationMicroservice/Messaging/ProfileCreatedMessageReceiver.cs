using Microsoft.Extensions.Hosting;
using Newtonsoft.Json.Linq;
using NotificationMicroservice.Model;
using NotificationMicroservice.Service;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace NotificationMicroservice.Messaging
{
    public class ProfileCreatedMessageReceiver : BackgroundService, IMessageReceiver
    {
        private IProfileService _profileService;
        private IConnection _connection;
        private IModel _channel;

        public ProfileCreatedMessageReceiver(IProfileService profileService)
        {
            _profileService = profileService;
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
            _channel.ExchangeDeclare(exchange: "profile.created", type: ExchangeType.Fanout);
            _channel.QueueDeclare(queue: "notification.profile.created",
                                  durable: false,
                                  exclusive: false,
                                  autoDelete: false,
                                  arguments: null);
            _channel.QueueBind(queue: "notification.profile.created",
                              exchange: "profile.created",
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
                    ImageName = data["profileImage"].Value<string>()
                });

                _channel.BasicAck(deliveryTag: ea.DeliveryTag, multiple: false);
            };

            _channel.BasicConsume(queue: "notification.profile.created",
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
