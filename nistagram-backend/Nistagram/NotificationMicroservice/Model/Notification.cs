using System;

namespace NotificationMicroservice.Model
{
    public class Notification
    {
        public int Id { get; set; }
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
