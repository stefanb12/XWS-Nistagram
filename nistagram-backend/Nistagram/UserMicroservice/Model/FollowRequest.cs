using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProfileMicroservice.Model
{
    public class FollowRequest
    {
        public int Id { get; set; }
        public bool Accepted { get; set; }
        public bool Processed { get; set; }
        public int ReceiverId { get; set; }
        public virtual Profile Receiver { get; set; }
        public int SenderId { get; set; }
        public virtual Profile Sender { get; set; }

        public FollowRequest()
        {
            Accepted = false;
            Processed = false;
        }
    }
}
