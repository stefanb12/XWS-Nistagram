using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PostMicroservice.Model
{
    public class PostLike
    {
        public int PostId { get; set; }
        public virtual Post Post { get; set; }
        public int LikeId { get; set; }
        public virtual Profile Like { get; set; }

        public PostLike() { }
    }
}
