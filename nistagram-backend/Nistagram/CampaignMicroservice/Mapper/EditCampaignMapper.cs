using CampaignMicroservice.Dto;
using CampaignMicroservice.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CampaignMicroservice.Mapper
{
    public class EditCampaignMapper
    {
        public static RepeatableCampaign EditCampaignDtoToCampaign(EditCampaignDto dto)
        {
            return new RepeatableCampaign()
            {
                Id = dto.Id,
                StartDate = dto.StartDate,
                EndDate = dto.EndDate,
                NumberOfRepeats = dto.NumberOfRepeats
            };
        }

        public static RepeatableCampaignEdit EditCampaignDtoToCampaignEdit(EditCampaignDto dto)
        {
            return new RepeatableCampaignEdit()
            {
                CampaignId = dto.Id,
                StartDate = dto.StartDate,
                EndDate = dto.EndDate,
                NumberOfRepeats = dto.NumberOfRepeats,
                ModificationDate = DateTime.Now
            };
        }
    }
}
