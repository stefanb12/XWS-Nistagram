using System;
using System.Collections.Generic;

namespace CampaignMicroservice.Model
{
    public class Story
    {
        public List<string> Tags { get; set; }
        public string Description { get; set; }
        public DateTime PublishingDate { get; set; }

        public Story()
        {
        }
    }
}
