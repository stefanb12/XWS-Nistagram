using WebShop.Model.Enum;

namespace WebShop.Dto
{
    public class RegistrationDto
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public UserRole UserRole { get; set; }

        public RegistrationDto()
        {
        }
    }
}
