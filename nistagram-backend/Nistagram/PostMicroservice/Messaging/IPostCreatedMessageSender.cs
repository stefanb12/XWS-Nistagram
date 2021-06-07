using PostMicroservice.Model;

namespace PostMicroservice.Messaging
{
    public interface IPostCreatedMessageSender
    {
        public void SendCreatedPost(Post post);
    }
}
