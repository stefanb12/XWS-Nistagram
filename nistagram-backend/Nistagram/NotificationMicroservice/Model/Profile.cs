using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace NotificationMicroservice.Model
{
    public class Profile
    {
        public int Id { get; set; }
        public int OriginalId { get; set; }
        public string Username { get; set; }
        public virtual List<NotificationProfile> NotificationProfiles { get; set; }
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
