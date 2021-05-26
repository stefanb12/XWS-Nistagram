using ProfileMicroservice.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace UserMicroservice.Model
{
    public class ProfileFollower
    {
        public int ProfileId { get; set; }
        public virtual Profile Profile { get; set; }
        public int FollowerId { get; set; }
        public virtual Profile Follower { get; set; }

        public ProfileFollower() { }
    }
}
