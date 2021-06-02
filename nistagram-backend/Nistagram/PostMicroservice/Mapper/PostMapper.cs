using Microsoft.AspNetCore.Http;
using PostMicroservice.Dto;
using PostMicroservice.Model;
using System;
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
            post.Location = new Location();
            post.Location.Address = dto.Location.Address;
            post.Location.City = dto.Location.City;
            post.Location.Country = dto.Location.Country;
            post.Publisher = new Profile();
            post.Publisher.OriginalId = dto.Publisher.Id;
            post.Publisher.Username = dto.Publisher.Username;
            post.Publisher.ImageName = dto.Publisher.ImageName;

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

        public static PostDto PostToPostDto(Post post)
        {
            PostDto dto = new PostDto();

            dto.Tags = post.Tags;
            dto.Description = post.Description;
            dto.Location = new LocationDto();
            dto.Location.Address = post.Location.Address;
            dto.Location.City = post.Location.City;
            dto.Location.Country = post.Location.Country;
            dto.Publisher = new ProfileDto();
            dto.Publisher.Id = post.Publisher.OriginalId;
            dto.Publisher.Username = post.Publisher.Username;
            dto.Publisher.ImageSrc = String.Format("http://localhost:55988/Images/{0}", post.Publisher.ImageName);
            dto.PublishingDate = post.PublishingDate;

            dto.ImagesSrc = new List<string>();
            for (int i = 0; i < post.Contents.Count; i++)
            {
                dto.ImagesSrc.Add(post.Contents[i].ImageSrc);
            }

            return dto;
        }
    }
}
