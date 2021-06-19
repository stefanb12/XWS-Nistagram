using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UserMicroservice.Model;

namespace ProfileMicroservice.Model
{
    public class ProfileSettings
    {
        public int Id { get; set; }
        public bool ReceiveAllMessages { get; set; }
        public bool TagAllowed { get; set; }
        public virtual List<ProfileMutedProfile> MutedProfiles { get; set; }   
        public virtual List<ProfileBlockedProfile> BlockedProfiles { get; set; }
        public virtual List<ProfileNotificationProfile> NotificationProfiles { get; set; }

        public ProfileSettings()
        {
            ReceiveAllMessages = true;
            TagAllowed = true;
        }
    }
}
