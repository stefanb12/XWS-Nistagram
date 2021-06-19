using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using WebShop.Model.Enum;

namespace WebShop.Model
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string MobilePhone { get; set; }
        public UserRole UserRole { get; set; }
        public int LocationId { get; set; }
        public virtual Location Location { get; set; }
        [NotMapped]
        public string Token { get; set; }

        public User()
        {
        }
    }
}
