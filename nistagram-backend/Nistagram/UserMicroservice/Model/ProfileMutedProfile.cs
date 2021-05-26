using ProfileMicroservice.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace UserMicroservice.Model
{
    public class ProfileMutedProfile
    {
        public int ProfileSettingsId { get; set; }
        public virtual ProfileSettings ProfileSettings { get; set; }
        public int MutedProfileId { get; set; }
        public virtual Profile MutedProfile { get; set; }

        public ProfileMutedProfile() { }
    }
}
