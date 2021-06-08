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
    public class PostCreatedMessageReceiver : BackgroundService, IMessageReceiver
    {
        private IPostService _postService;
        private IConnection _connection;
        private IModel _channel;

        public PostCreatedMessageReceiver(IPostService postService)
        {
            _postService = postService;
            InitRabbitMQ();
        }

        private void InitRabbitMQ()
        {
            var factory = new ConnectionFactory { HostName = "localhost" };

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
            consumer.Received += (model, ea) =>
            {
                var body = ea.Body.ToArray();
                var message = Encoding.UTF8.GetString(body);
                Console.WriteLine(" [x] Received {0}", message);

                var data = JObject.Parse(message);
                _postService.Insert(new Post()
                {
                    OriginalId = data["originalId"].Value<string>(),
                    ImageName = data["image"].Value<string>()
                });

                _channel.BasicAck(deliveryTag: ea.DeliveryTag, multiple: false);
            };

            _channel.BasicConsume(queue: "notification.post.created",
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
