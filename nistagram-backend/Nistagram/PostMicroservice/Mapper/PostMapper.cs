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

            if (dto.Dislikes != null)
            {
                List<Profile> dislikes = new List<Profile>();
                foreach(ProfileDto profileDto in dto.Dislikes)
                {
                    Profile profile = new Profile();
                    profile.OriginalId = profileDto.Id;
                    profile.Username = profileDto.Username;
                    dislikes.Add(profile);
                }
                post.Dislikes = dislikes;
            }

            if (dto.Likes != null)
            {
                List<Profile> likes = new List<Profile>();
                foreach (ProfileDto profileDto in dto.Likes)
                {
                    Profile profile = new Profile();
                    profile.OriginalId = profileDto.Id;
                    profile.Username = profileDto.Username;
                    likes.Add(profile);
                }
                post.Likes = likes;
            }

            if (dto.Comments != null)
            {
                List<Comment> comments = new List<Comment>();
                foreach (CommentDto commentDto in dto.Comments)
                {
                    Comment comment = new Comment();
                    comment.Text = commentDto.Text;
                    comment.Date = commentDto.Date;
                    comment.Publisher.OriginalId = commentDto.Publisher.Id;
                    comment.Publisher.Username = commentDto.Publisher.Username;
                    comment.Publisher.ImageName = commentDto.Publisher.ImageName;
                    comments.Add(comment);
                }
                post.Comments = comments;
            }
           
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

            dto.Id = post.Id;
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

            if (post.Dislikes != null)
            {
                List<ProfileDto> dislikesDto = new List<ProfileDto>();
                foreach (Profile profile in post.Dislikes)
                {
                    ProfileDto profileDto = new ProfileDto();
                    profileDto.Id = profile.OriginalId;
                    profileDto.Username = profile.Username;
                    dislikesDto.Add(profileDto);
                }
                dto.Dislikes = dislikesDto;
            }

            if (post.Likes != null)
            {
                List<ProfileDto> likesDto = new List<ProfileDto>();
                foreach (Profile profile in post.Likes)
                {
                    ProfileDto profileDto = new ProfileDto();
                    profileDto.Id = profile.OriginalId;
                    profileDto.Username = profile.Username;
                    likesDto.Add(profileDto);
                }
                dto.Likes = likesDto;
            }

            if (post.Favorites != null)
            {
                List<ProfileDto> favoritesDto = new List<ProfileDto>();
                foreach (Profile profile in post.Favorites)
                {
                    ProfileDto profileDto = new ProfileDto();
                    profileDto.Id = profile.OriginalId;
                    profileDto.Username = profile.Username;
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
                    commentDto.Publisher.ImageName = comment.Publisher.ImageName;
                    commentsDto.Add(commentDto);
                }
                dto.Comments = commentsDto;
            }

            dto.ImagesSrc = new List<string>();
            for (int i = 0; i < post.Contents.Count; i++)
            {
                dto.ImagesSrc.Add(post.Contents[i].ImageSrc);
            }

            return dto;
        }
    }
}
