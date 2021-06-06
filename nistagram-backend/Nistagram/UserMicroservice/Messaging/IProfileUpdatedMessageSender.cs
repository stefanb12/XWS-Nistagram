using ProfileMicroservice.Model;

namespace UserMicroservice.Messaging
{
    public interface IProfileUpdatedMessageSender
    {
        public void SendUpdatedProfile(Profile profile);
    }
}
