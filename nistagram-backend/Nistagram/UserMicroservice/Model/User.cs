using ProfileMicroservice.Model.Enum;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using UserMicroservice.Model.Enum;

namespace ProfileMicroservice.Model
{
    public class User
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string MobilePhone { get; set; }
        public DateTime DateOfBirth { get; set; }
        public Gender Gender { get; set; }
        public UserRole UserRole { get; set; }

        [NotMapped]
        public string Token { get; set; }

        public User()
        {
        }
    }
}
