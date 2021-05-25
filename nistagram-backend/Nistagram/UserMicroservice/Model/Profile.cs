using ProfileMicroservice.Model.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProfileMicroservice.Model
{
    public class Profile : User
    {
        public string Website { get; set; }
        public string Biography { get; set; }
        public List<Profile> Followers { get; set; }
        public List<Profile> Following { get; set; }
        public List<Profile> CloseFriends { get; set; }
        public bool Deactivated { get; set; }
        public UserCategory Category { get; set; }
        public ProfileSettings ProfileSettings { get; set; }

        public Profile()
        {
            Category = UserCategory.Regular;
        }
    }
}
