using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace PostMicroservice.Model
{
    public class Profile : User
    {
        public int Id { get; set; }
        public bool IsPrivate { get; set; }
        public int OriginalId { get; set; }
        public string ImageName { get; set; }
        public virtual List<ProfileFollowing> Following { get; set; }
        [NotMapped]
        public IFormFile ImageFile { get; set; }
        [NotMapped]
        public string ImageSrc { get; set; }

        public Profile() : base()
        {
        }
    }
}
