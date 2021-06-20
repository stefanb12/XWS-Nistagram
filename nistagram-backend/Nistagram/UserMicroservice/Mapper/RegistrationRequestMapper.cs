using ProfileMicroservice.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UserMicroservice.Dto;

namespace UserMicroservice.Mapper
{
    public class RegistrationRequestMapper
    {
        public static RegistrationRequestDto RegistrationRequestToRegistrationRequestDto(RegistrationRequest registrationRequest)
        {
            RegistrationRequestDto dto = new RegistrationRequestDto();
            dto.Id = registrationRequest.Id;
            dto.Accepted = registrationRequest.Accepted;
            dto.Processed = registrationRequest.Processed;
            dto.AgentId = registrationRequest.AgentId;
            dto.Agent = new ProfileDto()
            {
                Username = registrationRequest.Agent.Username,
                FullName = registrationRequest.Agent.FullName,
                Email = registrationRequest.Agent.Email,
                Website = registrationRequest.Agent.Website
            };
            return dto;
        }
    }
}
