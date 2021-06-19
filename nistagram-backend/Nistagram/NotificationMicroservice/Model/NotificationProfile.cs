using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NotificationMicroservice.Model
{
    public class NotificationProfile
    {
        public int Id { get; set; }
        public int NotificationProfileId { get; set; }
        public int NotificationId { get; set; }
        public virtual Notification Notification { get; set; }

        public NotificationProfile() { }
    }
}
