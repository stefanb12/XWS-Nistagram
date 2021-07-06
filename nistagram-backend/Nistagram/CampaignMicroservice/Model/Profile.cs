using CampaignMicroservice.Model.Enum;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace CampaignMicroservice.Model
{
    public class Profile
    {
        public int Id { get; set; }
        public int OriginalId { get; set; }
        public string Username { get; set; }
        public UserRole UserRole { get; set; }
        public virtual List<ProfileFollowing> Following { get; set; }
        public virtual List<ProfileFollower> Followers { get; set; }
        public string ImageName { get; set; }
        [NotMapped]
        public IFormFile ImageFile { get; set; }
        [NotMapped]
        public string ImageSrc { get; set; }

        public Profile()
        {
        }
    }
}
