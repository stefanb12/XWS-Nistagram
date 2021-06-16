﻿using Microsoft.AspNetCore.Http;
using ProfileMicroservice.Model.Enum;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
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
        public bool Accepted { get; set; }
        public bool Processed { get; set; }
        public int ProfileId { get; set; }
        public virtual Profile Profile { get; set; }
        public string ImageName { get; set; }
        [NotMapped]
        public IFormFile ImageFile { get; set; }
        [NotMapped]
        public string ImageSrc { get; set; }

        public ProfileVerificationRequest()
        {
        }
    }
}
