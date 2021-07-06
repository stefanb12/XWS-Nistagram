using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Newtonsoft.Json.Linq;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using UserMicroservice.Dto;
using UserMicroservice.Service;

namespace UserMicroservice.Messaging
{
    public class MuteProfileErrorMesssageReceiver : IHostedService, IMessageReceiver
    {
        private IConnection _connection;
        private IModel _channel;
        public IServiceProvider Services;

        public MuteProfileErrorMesssageReceiver(IServiceProvider services)
        {
            Services = services;
            InitRabbitMQ();
        }

        private void InitRabbitMQ()
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

            _connection = factory.CreateConnection();
            _channel = _connection.CreateModel();
            _channel.ExchangeDeclare(exchange: "profile.mute.error", type: ExchangeType.Fanout);
            _channel.QueueDeclare(queue: "profile.profile.mute.error",
                                  durable: false,
                                  exclusive: false,
                                  autoDelete: false,
                                  arguments: null);
            _channel.QueueBind(queue: "profile.profile.mute.error",
                              exchange: "profile.mute.error",
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

                scopedProcessingService.MuteRollback(
                    data["profileId"].Value<int>(),
                    data["muteProfileId"].Value<int>()
                );

                _channel.BasicAck(deliveryTag: ea.DeliveryTag, multiple: false);
            };

            _channel.BasicConsume(queue: "profile.profile.mute.error",
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
