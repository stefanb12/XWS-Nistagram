using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PostMicroservice.Model
{
    public class PostDislike
    {
        public int PostId { get; set; }
        public virtual Post Post { get; set; }
        public int DislikeId { get; set; }
        public virtual Profile Dislike { get; set; }

        public PostDislike() { }
    }
}
