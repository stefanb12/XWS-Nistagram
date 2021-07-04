using Microsoft.AspNetCore.Http;
using PostMicroservice.Dto;
using PostMicroservice.Model;
using System;
using System.Collections.Generic;
using System.IO;

namespace PostMicroservice.Mapper
{
    public class PostMapper
    {
        public static Post PostDtoToPost(PostDto dto, Profile publisher)
        {
            Post post = new Post();

            List<Tag> tags = new List<Tag>();
            if (dto.Tags != null)
            {
                foreach (string t in dto.Tags)
                {
                    Tag tag = new Tag();
                    tag.Content = t;
                    tags.Add(tag);
                }
            }
            post.Tags = tags;
            post.Description = dto.Description;
            post.Location = new Location();
            post.Location.Address = dto.Location.Address;
            post.Location.City = dto.Location.City;
            post.Location.Country = dto.Location.Country;
            post.PublisherId = publisher.Id;

            List<Content> contents = new List<Content>();
            if (dto.IsCommercial)
            {
                foreach (CommercialDto commercialDto in dto.ImagesSrc)
                {
                    var filePath = Path.GetFullPath(commercialDto.ImageName).Replace("PostMicroservice", "CampaignMicroservice\\wwwroot");
                    var fileBytes = File.ReadAllBytes(filePath);
                    var ms = new MemoryStream(fileBytes);
                    var formFile = new FormFile(ms, 0, ms.Length, null, Path.GetFileName(filePath))
                    {
                        Headers = new HeaderDictionary(),
                        ContentType = "image"
                    };

                    Content content = new Content();
                    content.ImageFile = formFile;
                    content.WebsiteLink = commercialDto.WebsiteLink;
                    contents.Add(content);
                }              
            } else
            {
                foreach (IFormFile file in dto.ImageFiles)
                {
                    Content content = new Content();
                    content.ImageFile = file;
                    contents.Add(content);
                }
            }
            
            post.Contents = contents;
            post.Deleted = dto.Deleted;
            post.IsCommercial = dto.IsCommercial;

            return post;
        }

        public static PostDto PostToPostDto(Post post)
        {
            PostDto dto = new PostDto();

            dto.Id = post.Id;
            List<string> tags = new List<string>();
            foreach(Tag tag in post.Tags)
            {
                tags.Add(tag.Content);
            }
            dto.Tags = tags;
            dto.Description = post.Description;
            dto.Location = new LocationDto();
            dto.Location.Address = post.Location.Address;
            dto.Location.City = post.Location.City;
            dto.Location.Country = post.Location.Country;
            dto.Publisher = new ProfileDto();
            dto.Publisher.Id = post.Publisher.OriginalId;
            dto.Publisher.Username = post.Publisher.Username;
            dto.Publisher.ImageSrc = String.Format("http://localhost:55988/{0}", post.Publisher.ImageName);
            dto.PublishingDate = post.PublishingDate;

            if (post.Dislikes != null)
            {
                List<ProfileDto> dislikesDto = new List<ProfileDto>();
                foreach (PostDislike postDislike in post.Dislikes)
                {
                    ProfileDto profileDto = new ProfileDto();
                    profileDto.Id = postDislike.Dislike.OriginalId;
                    profileDto.Username = postDislike.Dislike.Username;
                    profileDto.ImageSrc = String.Format("http://localhost:55988/{0}", postDislike.Dislike.ImageName);
                    dislikesDto.Add(profileDto);
                }
                dto.Dislikes = dislikesDto;
            }

            if (post.Likes != null)
            {
                List<ProfileDto> likesDto = new List<ProfileDto>();
                foreach (PostLike postLike in post.Likes)
                {
                    ProfileDto profileDto = new ProfileDto();
                    profileDto.Id = postLike.Like.OriginalId;
                    profileDto.Username = postLike.Like.Username;
                    profileDto.ImageSrc = String.Format("http://localhost:55988/{0}", postLike.Like.ImageName);
                    likesDto.Add(profileDto);
                }
                dto.Likes = likesDto;
            }

            if (post.Favorites != null)
            {
                List<ProfileDto> favoritesDto = new List<ProfileDto>();
                foreach (PostFavorite postFavorite in post.Favorites)
                {
                    ProfileDto profileDto = new ProfileDto();
                    profileDto.Id = postFavorite.Favorite.OriginalId;
                    profileDto.Username = postFavorite.Favorite.Username;
                    profileDto.ImageSrc = String.Format("http://localhost:55988/{0}", postFavorite.Favorite.ImageName);
                    favoritesDto.Add(profileDto);
                }
                dto.Favorites = favoritesDto;
            }

            if (post.Comments != null)
            {
                List<CommentDto> commentsDto = new List<CommentDto>();
                foreach (Comment comment in post.Comments)
                {
                    CommentDto commentDto = new CommentDto();
                    commentDto.Text = comment.Text;
                    commentDto.Date = comment.Date;
                    commentDto.Publisher = new ProfileDto();
                    commentDto.Publisher.Id = comment.Publisher.OriginalId;
                    commentDto.Publisher.Username = comment.Publisher.Username;
                    commentDto.Publisher.ImageSrc = String.Format("http://localhost:55988/{0}", comment.Publisher.ImageName);
                    commentsDto.Add(commentDto);
                }
                dto.Comments = commentsDto;
            }

            dto.ImagesSrc = new List<CommercialDto>();
            for (int i = 0; i < post.Contents.Count; i++)
            {
                CommercialDto commercialDto = new CommercialDto();
                commercialDto.ImageSrc = post.Contents[i].ImageSrc;
                commercialDto.WebsiteLink = post.Contents[i].WebsiteLink;
                dto.ImagesSrc.Add(commercialDto);
            }
            dto.Deleted = post.Deleted;
            dto.IsCommercial = post.IsCommercial;

            return dto;
        }
    }
}
