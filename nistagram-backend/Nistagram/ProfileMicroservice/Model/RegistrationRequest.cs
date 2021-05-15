﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProfileMicroservice.Model
{
    public class RegistrationRequest
    {
        public long Id { get; set; }
        public string ValidEmail { get; set; }
        public string WebsiteLink { get; set; }
        public bool Accepted { get; set; }
        public bool Processed { get; set; }
        public Agent Agent { get; set; }

        public RegistrationRequest()
        {
        }
    }
}
