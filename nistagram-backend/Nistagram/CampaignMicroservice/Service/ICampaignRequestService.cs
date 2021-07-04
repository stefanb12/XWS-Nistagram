﻿using CampaignMicroservice.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CampaignMicroservice.Service
{
    public interface ICampaignRequestService : IService<CampaignRequest>
    {
        public Task<List<CampaignRequest>> GetCampaignRequestsForCampaign(int campaignId);
    }
}
