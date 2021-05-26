using ProfileMicroservice.Model.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UserMicroservice.Model;

namespace ProfileMicroservice.Model
{
    public class Profile : User
    {
        public int Id { get; set; }
        public string ProfilePicture { get; set; }
        public bool Private { get; set; }
        public string Website { get; set; }
        public string Biography { get; set; }
        public bool Deactivated { get; set; }
        public UserCategory Category { get; set; }
        public virtual List<ProfileFollower> Followers { get; set; }
        public virtual List<ProfileFollowing> Following { get; set; }     
        public virtual List<ProfileCloseFriend> CloseFriends { get; set; }
        public int ProfileSettingsId { get; set; }
        public virtual ProfileSettings ProfileSettings { get; set; }

        public Profile()
        {
            Category = UserCategory.Regular;
        }
    }
}
