using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebShop.Dto
{
    public class AuthenticateDto
    {
        [Required]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }

        public AuthenticateDto() { }
    }
}
