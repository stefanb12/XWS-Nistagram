using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StoryMicroservice.Messaging
{
    public interface IMuteProfileErrorMesssageSender
    {
        public void SendMuteProfileError(int profileId, int muteProfileId);
    }
}
