using System;

namespace NotificationMicroservice.Model
{
    public class Notification
    {
        public int Id { get; set; }
        public DateTime Time { get; set; }
        public string Content { get; set; }
        public bool Seen { get; set; }
        public bool FollowRequest { get; set; }
        public int ReceiverId { get; set; }
        public virtual Profile Receiver { get; set; }
        public int SenderId { get; set; }
        public virtual Profile Sender { get; set; }
        public int PostId { get; set; }
        public virtual Post Post { get; set; }

        public Notification()
        {
        }
    }
}
