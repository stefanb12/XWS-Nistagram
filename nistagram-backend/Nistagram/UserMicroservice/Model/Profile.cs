using Microsoft.AspNetCore.Http;
using ProfileMicroservice.Model.Enum;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using UserMicroservice.Model;

namespace ProfileMicroservice.Model
{
    public class Profile : User
    {
        public int Id { get; set; }
        public bool IsPrivate { get; set; }
        public string Website { get; set; }
        public string Biography { get; set; }
        public bool Deactivated { get; set; }
        public UserCategory Category { get; set; }
        public virtual List<ProfileFollower> Followers { get; set; }
        public virtual List<ProfileFollowing> Following { get; set; }     
        public virtual List<ProfileCloseFriend> CloseFriends { get; set; }
        public int ProfileSettingsId { get; set; }
        public virtual ProfileSettings ProfileSettings { get; set; }
        public string ImageName { get; set; }
        [NotMapped]
        public IFormFile ImageFile { get; set; }
        [NotMapped]
        public string ImageSrc { get; set; }

        public Profile()
        {
            Category = UserCategory.Regular;
            ImageName = "defaultProfile.png";
            Followers = new List<ProfileFollower>();
            Following = new List<ProfileFollowing>();
        }
    }
}
