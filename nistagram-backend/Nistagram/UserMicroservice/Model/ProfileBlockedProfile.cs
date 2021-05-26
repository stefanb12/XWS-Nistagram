using ProfileMicroservice.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace UserMicroservice.Model
{
    public class ProfileBlockedProfile
    {
        public int ProfileSettingsId { get; set; }
        public virtual ProfileSettings ProfileSettings { get; set; }
        public int BlockedProfileId { get; set; }
        public virtual Profile BlockedProfile { get; set; }

        public ProfileBlockedProfile() { }
    }
}
