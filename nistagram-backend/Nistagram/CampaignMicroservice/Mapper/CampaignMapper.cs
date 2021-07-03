using CampaignMicroservice.Dto;
using CampaignMicroservice.Model;
using System;
using System.Collections.Generic;

namespace CampaignMicroservice.Mapper
{
    public class CampaignMapper
    {
        public static SingleCampaign CampaignDtoToSingleCampaign(CampaignDto dto)
        {
            SingleCampaign singleCampaign = new SingleCampaign();
            singleCampaign.IsPost = dto.IsPost;
            singleCampaign.AgentId = dto.AgentId;
            singleCampaign.PostId = 1;
            singleCampaign.StoryId = 1;
            if (dto.IsPost)
            {
                singleCampaign.PostId = dto.PostId;
            }
            else
            {
                singleCampaign.StoryId = dto.StoryId;
            }
            singleCampaign.BroadcastTime = dto.BroadcastTime;

            List<CampaignCommercial>campaignCommercials = new List<CampaignCommercial>();
            foreach(Commercial commercial in dto.Commercials)
            {
                CampaignCommercial campaignCommercial = new CampaignCommercial();
                campaignCommercial.CommercialId = commercial.Id;
                campaignCommercials.Add(campaignCommercial);
            }

            return singleCampaign;
        }

        public static RepeatableCampaign CampaignDtoToRepeatableCampaign(CampaignDto dto)
        {
            RepeatableCampaign repeatableCampaign = new RepeatableCampaign();
            repeatableCampaign.IsPost = dto.IsPost;
            repeatableCampaign.AgentId = dto.AgentId;
            repeatableCampaign.PostId = 1;
            repeatableCampaign.StoryId = 1;
            if(dto.IsPost)
            {
                repeatableCampaign.PostId = dto.PostId;
            } else
            {
                repeatableCampaign.StoryId = dto.StoryId;
            }
            repeatableCampaign.StartDate = dto.StartDate;
            repeatableCampaign.EndDate = dto.EndDate;
            repeatableCampaign.NumberOfRepeats = dto.NumberOfRepeats;
            repeatableCampaign.LastModification = DateTime.Now;

            List<CampaignCommercial> campaignCommercials = new List<CampaignCommercial>();
            foreach (Commercial commercial in dto.Commercials)
            {
                CampaignCommercial campaignCommercial = new CampaignCommercial();
                campaignCommercial.CommercialId = commercial.Id;
                campaignCommercials.Add(campaignCommercial);
            }

            return repeatableCampaign;
        }
    }
}
