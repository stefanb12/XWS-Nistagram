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
using Microsoft.Extensions.DependencyInjection;

namespace PostMicroservice.Messaging
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
            var factory = new ConnectionFactory()
            {
                HostName = "host.docker.internal",
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
                foreach(int followingId in data["following"].ToObject<List<int>>())
                {
                    following.Add(new ProfileFollowing() { ProfileId = data["id"].Value<int>(), FollowingId = followingId });
                }

                List<ProfileMutedProfile> mutedProfiles = new List<ProfileMutedProfile>();
                foreach (int mutedProfileId in data["mutedProfiles"].ToObject<List<int>>())
                {
                    mutedProfiles.Add(new ProfileMutedProfile() { ProfileId = data["id"].Value<int>(), MutedProfileId = mutedProfileId });
                }

                List<ProfileBlockedProfile> blockedProfiles = new List<ProfileBlockedProfile>();
                foreach (int blockedProfileId in data["blockedProfiles"].ToObject<List<int>>())
                {
                    blockedProfiles.Add(new ProfileBlockedProfile() { ProfileId = data["id"].Value<int>(), BlockedProfileId = blockedProfileId });
                }

                scopedProcessingService.Update(new Profile()
                {
                    OriginalId = data["id"].Value<int>(),
                    Username = data["username"].Value<string>(),
                    ImageName = data["profileImage"].Value<string>(),
                    IsPrivate = data["isPrivate"].Value<bool>(),
                    Deactivated = data["deactivated"].Value<bool>(),
                    Following = following,
                    MutedProfiles = mutedProfiles,
                    BlockedProfiles = blockedProfiles
                });

                _channel.BasicAck(deliveryTag: ea.DeliveryTag, multiple: false);
            };

            _channel.BasicConsume(queue: "post.profile.updated",
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
