using WebShop.Dto;
using WebShop.Model;

namespace WebShop.Mapper
{
    public class RegistrationMapper
    {
        public static User RegistrationDtoToUser(RegistrationDto dto)
        {
            User user = new User();
            
            user.Username = dto.Username;
            user.Password = dto.Password;
            user.Name = dto.FullName;
            user.Email = dto.Email;
            user.UserRole = dto.UserRole;
            user.LocationId = 1;

            return user;
        }
    }
}
