using ProfileMicroservice.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace UserMicroservice.Model
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
