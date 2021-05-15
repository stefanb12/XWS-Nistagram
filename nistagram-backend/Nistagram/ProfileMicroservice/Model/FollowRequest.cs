using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProfileMicroservice.Model
{
    public class FollowRequest
    {
        public long Id { get; set; }
        public bool Accepted { get; set; }
        public bool Processed { get; set; }
        public Profile Receiver { get; set; }
        public Profile Sender { get; set; }

        public FollowRequest()
        {
        }
    }
}
