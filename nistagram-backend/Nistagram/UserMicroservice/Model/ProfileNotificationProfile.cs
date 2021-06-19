using ProfileMicroservice.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace UserMicroservice.Model
{
    public class ProfileNotificationProfile
    {
        public int ProfileSettingsId { get; set; }
        public virtual ProfileSettings ProfileSettings { get; set; }
        public int NotificationProfileId { get; set; }
        public virtual Profile NotificationProfile { get; set; }

        public ProfileNotificationProfile() { }
    }
}
