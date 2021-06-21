using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NotificationMicroservice.Model
{
    public class ProfileNotificationProfile
    {
        public int ProfileId { get; set; }
        public virtual Profile Profile { get; set; }
        public int NotificationProfileId { get; set; }
        public virtual Profile NotificationProfile { get; set; }

        public ProfileNotificationProfile() { }
    }
}
