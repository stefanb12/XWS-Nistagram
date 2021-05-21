using ProfileMicroservice.Model.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProfileMicroservice.Model
{
    public class ProfileVerificationRequest
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public UserCategory Category { get; set; }
        public string DocumentPicture { get; set; }
        public bool Accepted { get; set; }
        public bool Processed { get; set; }
        public Profile profile { get; set; }

        public ProfileVerificationRequest()
        {
        }
    }
}
