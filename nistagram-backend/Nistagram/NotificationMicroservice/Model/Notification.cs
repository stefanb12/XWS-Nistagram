using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NotificationMicroservice.Model
{
    public class Notification
    {
        public long Id { get; set; }
        public DateTime Time { get; set; }
        public string Content { get; set; }
        public Profile Receiver { get; set; }
        public Profile Profile { get; set; }
        public Post Post { get; set; }

        public Notification()
        {
        }
    }
}
