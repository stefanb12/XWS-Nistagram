using Microsoft.AspNetCore.Http;
using PostMicroservice.Dto;
using PostMicroservice.Model;
using System.Collections.Generic;

namespace PostMicroservice.Mapper
{
    public class PostMapper
    {
        public static Post PostDtoToPost(PostDto dto)
        {
            Post post = new Post();

            post.Tags = dto.Tags;
            post.Description = dto.Description;
            /*            post.Location.Address = dto.Location.Address;
                        post.Location.City = dto.Location.City;
                        post.Location.Country = dto.Location.Country;
                        post.Publisher.Id = dto.Publisher.Id;
            post.Publisher.Username = dto.Publisher.Username;*/

            List<Content> contents = new List<Content>();
            foreach(IFormFile file in dto.ImageFiles)
            {
                Content content = new Content();
                content.ImageFile = file;
                contents.Add(content);
            }
            post.Contents = contents;

            return post;
        }
    }
}
