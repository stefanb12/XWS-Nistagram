using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PostMicroservice.Model
{
    public class ProfileMutedProfile
    {
        public int ProfileId { get; set; }
        public virtual Profile Profile{ get; set; }
        public int MutedProfileId { get; set; }
        public virtual Profile MutedProfile { get; set; }

        public ProfileMutedProfile() { }
    }
}
