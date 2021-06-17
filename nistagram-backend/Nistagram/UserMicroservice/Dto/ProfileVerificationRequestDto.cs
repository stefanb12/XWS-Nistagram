using Microsoft.AspNetCore.Http;
using ProfileMicroservice.Model.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace UserMicroservice.Dto
{
    public class ProfileVerificationRequestDto
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public UserCategory Category { get; set; }
        public string CategoryName { get; set; }
        public IFormFile ImageFile { get; set; }
        public string ImageSrc { get; set; }
        public int ProfileId { get; set; }
        public string Username { get; set; }
        public bool Accepted { get; set; }
        public bool Processed { get; set; }

        public ProfileVerificationRequestDto()
        {
        }
    }
}
