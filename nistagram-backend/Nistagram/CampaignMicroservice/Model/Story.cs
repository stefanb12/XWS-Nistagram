using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace CampaignMicroservice.Model
{
    public class Story
    {
        public int Id { get; set; }
        public string OriginalId { get; set; }

        public Story()
        {
        }
    }
}
