using StoryMicroservice.Model;

namespace StoryMicroservice.Messaging
{
    public interface IStoryCreatedMessageSender
    {
        public void SendCreatedStory(Story story);
    }
}
