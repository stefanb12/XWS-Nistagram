using Microsoft.Extensions.DependencyInjection;
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
    public class PostCreatedMessageReceiver : IHostedService, IMessageReceiver
    {
        private IConnection _connection;
        private IModel _channel;
        public IServiceProvider Services;

        public PostCreatedMessageReceiver(IServiceProvider services)
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
            _channel.ExchangeDeclare(exchange: "post.created", type: ExchangeType.Fanout);
            _channel.QueueDeclare(queue: "notification.post.created",
                                  durable: false,
                                  exclusive: false,
                                  autoDelete: false,
                                  arguments: null);
            _channel.QueueBind(queue: "notification.post.created",
                              exchange: "post.created",
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
                        .GetRequiredService<IPostService>();

                scopedProcessingService.Insert(new Post()
                {
                    OriginalId = data["originalId"].Value<int>(),
                    ImageName = data["image"].Value<string>()
                });
                

                _channel.BasicAck(deliveryTag: ea.DeliveryTag, multiple: false);
            };

            _channel.BasicConsume(queue: "notification.post.created",
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
