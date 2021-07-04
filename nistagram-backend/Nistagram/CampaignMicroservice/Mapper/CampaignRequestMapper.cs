using CampaignMicroservice.Dto;
using CampaignMicroservice.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CampaignMicroservice.Mapper
{
    public class CampaignRequestMapper
    {
        public static CampaignRequest CampaignRequestDtoToCampaignRequest(CampaignRequestDto dto)
        {
            return new CampaignRequest()
            {
                InfluencerId = dto.InfluencerId,
                CampaignId = dto.CampaignId,
                Processed = false,
                Accepted = false
            };
        }

        public static CampaignRequestDto CampaignRequestToCampaignRequestDto(CampaignRequest campaignRequest)
        {
            return new CampaignRequestDto()
            {
                InfluencerId = campaignRequest.InfluencerId,
                CampaignId = campaignRequest.CampaignId,
                Processed = false,
                Accepted = false
            };
        }
    }
}
