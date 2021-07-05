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
            singleCampaign.StoryId = "";
            if (dto.IsPost)
            {
                singleCampaign.PostId = dto.PostId;
            }
            else
            {
                singleCampaign.StoryId = dto.StoryId;
            }
            singleCampaign.BroadcastTime = dto.BroadcastTime;

            List<CampaignCommercial> campaignCommercials = new List<CampaignCommercial>();
            foreach(CommercialDto commercial in dto.Commercials)
            {
                CampaignCommercial campaignCommercial = new CampaignCommercial();
                campaignCommercial.CommercialId = commercial.Id;
                campaignCommercials.Add(campaignCommercial);
            }
            singleCampaign.Commercials = campaignCommercials;

            return singleCampaign;
        }

        public static RepeatableCampaign CampaignDtoToRepeatableCampaign(CampaignDto dto)
        {
            RepeatableCampaign repeatableCampaign = new RepeatableCampaign();
            repeatableCampaign.IsPost = dto.IsPost;
            repeatableCampaign.AgentId = dto.AgentId;
            repeatableCampaign.PostId = 1;
            repeatableCampaign.StoryId = "";
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
            foreach (CommercialDto commercial in dto.Commercials)
            {
                CampaignCommercial campaignCommercial = new CampaignCommercial();
                campaignCommercial.CommercialId = commercial.Id;
                campaignCommercials.Add(campaignCommercial);
            }
            repeatableCampaign.Commercials = campaignCommercials;

            return repeatableCampaign;
        }

        public static CampaignDto CampaignToCampaignDto(SingleCampaign singleCampaign, RepeatableCampaign repeatableCampaign)
        {
            CampaignDto dto = new CampaignDto();
            if (singleCampaign != null)
            {
                dto.Id = singleCampaign.Id;
                dto.IsSingleCampaign = true;
                dto.IsPost = singleCampaign.IsPost;
                dto.AgentId = singleCampaign.AgentId;
                dto.BroadcastTime = singleCampaign.BroadcastTime;
                foreach (CampaignCommercial campaignCommercial in singleCampaign.Commercials)
                {
                    CommercialDto commercialDto = new CommercialDto();
                    commercialDto.WebsiteLink = campaignCommercial.Commercial.WebsiteLink;
                    commercialDto.ImageSrc = String.Format("http://localhost:56000/{0}", campaignCommercial.Commercial.ImageName);
                    commercialDto.ImageName = campaignCommercial.Commercial.ImageName;
                    dto.Commercials.Add(commercialDto);
                }
            } else // RepeatableCampaign
            {
                dto.Id = repeatableCampaign.Id;
                dto.IsSingleCampaign = false;
                dto.IsPost = repeatableCampaign.IsPost;
                dto.AgentId = repeatableCampaign.AgentId;
                dto.StartDate = repeatableCampaign.StartDate;
                dto.EndDate = repeatableCampaign.EndDate;
                dto.NumberOfRepeats = repeatableCampaign.NumberOfRepeats;
                foreach (CampaignCommercial campaignCommercial in repeatableCampaign.Commercials)
                {
                    CommercialDto commercialDto = new CommercialDto();
                    commercialDto.WebsiteLink = campaignCommercial.Commercial.WebsiteLink;
                    commercialDto.ImageSrc = String.Format("http://localhost:56000/{0}", campaignCommercial.Commercial.ImageName);
                    commercialDto.ImageName = campaignCommercial.Commercial.ImageName;
                    dto.Commercials.Add(commercialDto);
                }
            }

            return dto;
        }
    }
}
