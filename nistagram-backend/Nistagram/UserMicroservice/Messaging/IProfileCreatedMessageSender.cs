using ProfileMicroservice.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace UserMicroservice.Messaging
{
    public interface IProfileCreatedMessageSender
    {
        public void SendCreatedProfile(Profile profile);
    }
}
