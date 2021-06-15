using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PostMicroservice.Model
{
    public class ProfileFollowing
    {
        public int ProfileId { get; set; }
        public virtual Profile Profile { get; set; }
        public int FollowingId { get; set; }
        public virtual Profile Following { get; set; }

        public ProfileFollowing() { }
    }
}
