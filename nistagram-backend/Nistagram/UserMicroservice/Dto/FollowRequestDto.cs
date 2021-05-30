using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace UserMicroservice.Dto
{
    public class FollowRequestDto
    {
        public bool Accepted { get; set; }
        public bool Processed { get; set; }
        public int ReceiverId { get; set; }
        public int SenderId { get; set; }

        public FollowRequestDto() { }
    }
}
