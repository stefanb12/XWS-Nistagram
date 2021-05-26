using ProfileMicroservice.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace UserMicroservice.Model
{
    public class ProfileCloseFriend
    {
        public int ProfileId { get; set; }
        public virtual Profile Profile { get; set; }
        public int CloseFriendId { get; set; }
        public virtual Profile CloseFriend { get; set; }

        public ProfileCloseFriend() { }
    }
}
