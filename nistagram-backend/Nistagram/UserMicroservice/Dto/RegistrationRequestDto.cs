using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace UserMicroservice.Dto
{
    public class RegistrationRequestDto
    {
        public int Id { get; set; }
        public bool Accepted { get; set; }
        public bool Processed { get; set; }
        public int AgentId { get; set; }
        public virtual ProfileDto Agent { get; set; }

        public RegistrationRequestDto()
        {
        }
    }
}
