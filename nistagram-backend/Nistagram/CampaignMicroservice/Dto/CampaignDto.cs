﻿using CampaignMicroservice.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CampaignMicroservice.Dto
{
    public class CampaignDto
    {
        public bool IsSingleCampaign { get; set; }
        public bool IsPost { get; set; }
        public List<Commercial> Commercials { get; set; }
        public int AgentId { get; set; }
        public virtual Profile Agent { get; set; }
        public int PostId { get; set; }
        public int StoryId { get; set; }
        public DateTime BroadcastTime { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int NumberOfRepeats { get; set; }
        public DateTime LastModification { get; set; }

        public CampaignDto() { }
    }
}
