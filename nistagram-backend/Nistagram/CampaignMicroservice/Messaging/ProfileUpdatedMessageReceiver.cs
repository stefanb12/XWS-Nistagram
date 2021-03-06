using CampaignMicroservice.Model;
using CampaignMicroservice.Service;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Newtonsoft.Json.Linq;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace CampaignMicroservice.Messaging
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
            _channel.ExchangeDeclare(exchange: "profile.updated", type: ExchangeType.Fanout);
            _channel.QueueDeclare(queue: "campaign.profile.updated",
                                  durable: false,
                                  exclusive: false,
                                  autoDelete: false,
                                  arguments: null);
            _channel.QueueBind(queue: "campaign.profile.updated",
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

                List<ProfileFollowing> following = new List<ProfileFollowing>();
                foreach (int followingId in data["following"].ToObject<List<int>>())
                {
                    following.Add(new ProfileFollowing() { ProfileId = data["id"].Value<int>(), FollowingId = followingId });
                }

                List<ProfileFollower> followers = new List<ProfileFollower>();
                foreach (int followerId in data["followers"].ToObject<List<int>>())
                {
                    followers.Add(new ProfileFollower() { ProfileId = data["id"].Value<int>(), FollowerId = followerId });
                }

                scopedProcessingService.Update(new Profile()
                {
                    OriginalId = data["id"].Value<int>(),
                    Username = data["username"].Value<string>(),
                    ImageName = data["profileImage"].Value<string>(),
                    Following = following,
                    Followers = followers
                });

                _channel.BasicAck(deliveryTag: ea.DeliveryTag, multiple: false);
            };

            _channel.BasicConsume(queue: "campaign.profile.updated",
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
