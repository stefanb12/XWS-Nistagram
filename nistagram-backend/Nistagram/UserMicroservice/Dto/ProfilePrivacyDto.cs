using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace UserMicroservice.Dto
{
    public class ProfilePrivacyDto
    {
        public int Id { get; set; }
        public bool IsPrivate { get; set; }

        public bool ReceiveAllMessages { get; set; }
        public bool TagAllowed { get; set; }

        public ProfilePrivacyDto() { }
    }
}
