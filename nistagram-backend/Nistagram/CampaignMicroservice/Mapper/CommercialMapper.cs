using CampaignMicroservice.Dto;
using CampaignMicroservice.Model;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace CampaignMicroservice.Mapper
{
    public class CommercialMapper
    {
        public static Commercial CommercialDtoToCommercial(CommercialDto dto, Profile agent)
        {
            Commercial commercial = new Commercial();

            var filePath = Path.GetFullPath(dto.ImageSrc.Substring(23)).Replace("nistagram-backend\\Nistagram\\CampaignMicroservice", "agent-app-backend\\WebShop\\WebShop\\wwwroot");
            var fileBytes = File.ReadAllBytes(filePath);
            var ms = new MemoryStream(fileBytes);
            var formFile = new FormFile(ms, 0, ms.Length, null, Path.GetFileName(filePath))
            {
                Headers = new HeaderDictionary(),
                ContentType = "image"
            };
            commercial.ImageFile = formFile;
            commercial.WebsiteLink = dto.WebsiteLink;
            commercial.AgentId = agent.OriginalId;

            return commercial;
        }
    }
}
