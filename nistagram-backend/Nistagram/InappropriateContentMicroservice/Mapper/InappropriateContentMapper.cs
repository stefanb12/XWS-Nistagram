using InappropriateContentMicroservice.Dto;
using InappropriateContentMicroservice.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InappropriateContentMicroservice.Mapper
{
    public class InappropriateContentMapper
    {
        public static InappropriateContent InappropriateContentDtoToInappropriateContent(InappropriateContentDto dto, Story story)
        {
            InappropriateContent inappropriateContent = new InappropriateContent();

            inappropriateContent.ReportComment = dto.ReportComment;
            inappropriateContent.Processed = false;
            inappropriateContent.IsPost = dto.IsPost;
            inappropriateContent.SenderId = dto.SenderId;
            inappropriateContent.PostId = dto.PostId;
            inappropriateContent.StoryId = 1;
            if (story != null)
            {
                inappropriateContent.StoryId = story.Id;
            }

            return inappropriateContent;
        }

        public static InappropriateContentDto InappropriateContentToInappropriateContentDto(InappropriateContent inappropriateContent)
        {
            InappropriateContentDto dto = new InappropriateContentDto();

            dto.ReportComment = inappropriateContent.ReportComment;
            dto.Processed = inappropriateContent.Processed;
            dto.IsPost = inappropriateContent.IsPost;
            dto.SenderId = inappropriateContent.SenderId;
            dto.Username = inappropriateContent.Sender.Username;

            if (!inappropriateContent.IsPost)
            {
                dto.StoryId = inappropriateContent.Story.OriginalId;
            } else
            {
                dto.PostId = inappropriateContent.PostId;
            }  

            return dto;
        }
    }
}
