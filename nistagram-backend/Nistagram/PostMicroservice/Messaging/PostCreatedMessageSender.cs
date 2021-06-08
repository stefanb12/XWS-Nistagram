using Newtonsoft.Json;
using PostMicroservice.Model;
using RabbitMQ.Client;
using System.Text;
namespace PostMicroservice.Messaging
{
    public class PostCreatedMessageSender : IPostCreatedMessageSender
    {
        public PostCreatedMessageSender() { }

        public void SendCreatedPost(Post post)
        {
            var factory = new ConnectionFactory() { HostName = "localhost" };
            using (var connection = factory.CreateConnection())
            using (var channel = connection.CreateModel())
            {
                channel.ExchangeDeclare(exchange: "post.created", type: ExchangeType.Fanout);

                var integrationEventData = JsonConvert.SerializeObject(new
                {
                    originalId = post.Id,
                    image = post.Contents[0].ImageName
                });

                var body = Encoding.UTF8.GetBytes(integrationEventData);

                channel.BasicPublish(exchange: "post.created",
                                     routingKey: "",
                                     basicProperties: null,
                                     body: body);
            }
        }
    }
}
