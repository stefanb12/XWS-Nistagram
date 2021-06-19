using ProfileMicroservice.Model.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UserMicroservice.Model.Enum;

namespace UserMicroservice.Dto
{
    public class RegistrationDto
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public Gender Gender { get; set; }
        public UserRole UserRole { get; set; }
        public string Website { get; set; }

        public RegistrationDto()
        {
        }
    }
}
