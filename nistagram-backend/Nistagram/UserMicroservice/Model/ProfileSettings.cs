using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProfileMicroservice.Model
{
    public class ProfileSettings
    {
        public int Id { get; set; }
        public bool PrivateProfile { get; set; }
        public bool ReceiveAllMessages { get; set; }
        public bool TagAllowed { get; set; }
        public List<Profile> MutedUsers { get; set; }
        public List<Profile> BlockedUsers { get; set; }

        public ProfileSettings()
        {
        }
    }
}
