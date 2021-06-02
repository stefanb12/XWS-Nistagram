using Microsoft.AspNetCore.Http;
using ProfileMicroservice.Model.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UserMicroservice.Model.Enum;

namespace UserMicroservice.Dto
{
    public class UpdateDto
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string MobilePhone { get; set; }
        public DateTime DateOfBirth { get; set; }
        public Gender Gender { get; set; }
        public UserRole UserRole { get; set; }
        public string ProfilePicture { get; set; }
        public IFormFile ImageFile { get; set; }
        public bool Private { get; set; }
        public string Website { get; set; }
        public string Biography { get; set; }
        public bool Deactivated { get; set; }
        public UserCategory Category { get; set; }
        public string ImageSrc { get; set; }

        public UpdateDto() { }
    }
}

