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
    }
}
