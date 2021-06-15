using PostMicroservice.Dto;
using PostMicroservice.Model;
using System;

namespace PostMicroservice.Mapper
{
    public class CommentMapper
    {
        public static Comment CommentDtoToComment(UpdatePostDto dto, Profile publisher)
        {
            Comment comment = new Comment();
            /*comment.Publisher = new Profile();
            comment.Publisher.OriginalId = dto.Publisher.Id;
            comment.Publisher.Username = dto.Publisher.Username;
            comment.Publisher.ImageName = dto.Publisher.ImageName;*/
            comment.PublisherId = publisher.Id;
            comment.Text = dto.Text;
            comment.Date = DateTime.Now;
            return comment;
        }
    }
}
