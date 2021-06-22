using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PostMicroservice.Model
{
    public class ProfileBlockedProfile
    {
        public int ProfileId { get; set; }
        public virtual Profile Profile { get; set; }
        public int BlockedProfileId { get; set; }
        public virtual Profile BlockedProfile { get; set; }

        public ProfileBlockedProfile() { }
    }
}
