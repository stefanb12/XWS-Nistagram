﻿using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using PostMicroservice.Dto;
using PostMicroservice.Messaging;
using PostMicroservice.Model;
using PostMicroservice.Repository;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace PostMicroservice.Service
{
    public class PostService : IPostService
    {
        private IPostRepository _postRepository;
        private IProfileService _profileService;
        private IPostCreatedMessageSender _postCreatedMessageSender;
        private readonly IWebHostEnvironment _hostEnvironment;

        public PostService(IPostRepository postRepository, IProfileService profileService, IPostCreatedMessageSender postCreatedMessageSender, IWebHostEnvironment hostEnvironment)
        {
            _postRepository = postRepository;
            _profileService = profileService;
            _postCreatedMessageSender = postCreatedMessageSender;
            _hostEnvironment = hostEnvironment;
        }

        public async Task<List<Post>> GetPostsForProfile(int profileId)
        {
            List<Post> profilePosts = new List<Post>();
            foreach (Post post in await GetAll())
            {
                if (post.Publisher.OriginalId == profileId)
                {
                    profilePosts.Add(post);
                }
            }
            return profilePosts;
        }

        public async Task<List<Post>> GetFavoritePostsForProfile(int profileId)
        {
            List<Post> favoritePosts = new List<Post>();
            foreach (Post post in await GetAll())
            {
                if(post.Favorites != null)
                {
                    foreach (Profile profile in post.Favorites)
                    {
                        if (profile.OriginalId == profileId)
                        {
                            favoritePosts.Add(post);
                            break;
                        }
                    }
                }       
            }
            return favoritePosts;
        }

        public async Task<List<Post>> GetAllPublicPosts(int profileId)
        {
            List<Post> publicPosts = new List<Post>();
            foreach (Profile profile in await _profileService.GetAllPublicProfiles())
            {
                foreach (Post post in await GetAll())
                {
                    if (profile.OriginalId == post.Publisher.OriginalId && profileId != post.Publisher.OriginalId)
                    {
                        publicPosts.Add(post);
                    }
                }
            }
            return publicPosts;
        }

        public async Task<List<Post>> GetPostsFromFollowedProfiles(int profileId)
        {
            List<Post> posts = new List<Post>();
            Profile profile = await _profileService.GetProfileByOriginalId(profileId);

            foreach (int followedId in profile.Following)
            {
                foreach (Post post in await GetAll())
                {
                    if (followedId == post.Publisher.OriginalId)
                    {
                        posts.Add(post);
                    }
                }
            }
            return posts;
        }

        public async Task<Post> InsertNewComment(Post post, Comment comment)
        {
            if (post.Comments == null)
            {
                post.Comments = new List<Comment>();
            }
            post.Comments.Add(comment);
            return await Update(post);
        }

        public async Task<Post> LikePost(Post post, Profile profile)
        {
            if(post.Likes == null)
            {
                post.Likes = new List<Profile>();
            }

            if(CheckIfUserHasAlreadyLikedPost(post, profile.OriginalId))
            {
                int index = post.Likes.FindIndex(p => p.OriginalId == profile.OriginalId);
                post.Likes.RemoveAt(index);
            } else
            {
                post = DeleteUserFromDislikesIfExistThere(post, profile);
                post.Likes.Add(profile);
            }

            return await Update(post);
        }

        public async Task<Post> DisikePost(Post post, Profile profile)
        {
            if (post.Dislikes == null)
            {
                post.Dislikes = new List<Profile>();
            }

            if (CheckIfUserHasAlreadyDislikedPost(post, profile.OriginalId))
            {
                int index = post.Dislikes.FindIndex(p => p.OriginalId == profile.OriginalId);
                post.Dislikes.RemoveAt(index);
            }
            else
            {
                post = DeleteUserFromLikesIfExistThere(post, profile);
                post.Dislikes.Add(profile);
            }

            return await Update(post);
        }

        private Post DeleteUserFromDislikesIfExistThere(Post post, Profile profile)
        {
            if (post.Dislikes != null)
            {
                if (CheckIfUserHasAlreadyDislikedPost(post, profile.OriginalId))
                {
                    int index = post.Dislikes.FindIndex(p => p.OriginalId == profile.OriginalId);
                    post.Dislikes.RemoveAt(index);
                }
            }
            return post;
        }

        private Post DeleteUserFromLikesIfExistThere(Post post, Profile profile)
        {
            if (post.Dislikes != null)
            {
                if (CheckIfUserHasAlreadyLikedPost(post, profile.OriginalId))
                {
                    int index = post.Likes.FindIndex(p => p.OriginalId == profile.OriginalId);
                    post.Likes.RemoveAt(index);
                }
            }
            return post;
        }

        private bool CheckIfUserHasAlreadyLikedPost(Post post, int originalId)
        {
            foreach(Profile profile in post.Likes)
            {
                if (profile.OriginalId == originalId)
                {
                    return true; 
                }
            }
            return false;
        }

        public async Task<List<Post>> GetSearchResult(string searchParam)
        {
            List<Post> searchedPosts = new List<Post>();
            foreach (Post post in await GetAll())
            {
                if (post.Location != null) 
                    if (formatAddress(post) == searchParam)
                        searchedPosts.Add(post);
                
                if (post.Tags != null)
                    if (post.Tags.Contains(searchParam))
                        searchedPosts.Add(post);
            }
            return searchedPosts;
        }

        public string formatAddress(Post post) {
            if (post.Location.Address == "" || post.Location.Address == null)
                return post.Location.City + ", " + post.Location.Country;
            else
                return post.Location.Address + ", " + post.Location.City + ", " + post.Location.Country;
        }

        private bool CheckIfUserHasAlreadyDislikedPost(Post post, int originalId)
        {
            foreach (Profile profile in post.Dislikes)
            {
                if (profile.OriginalId == originalId)
                {
                    return true;
                }
            }
            return false;
        }

        public async Task<Post> SavePostAsFavorite(Post post, Profile profile)
        {
            if (post.Favorites == null)
            {
                post.Favorites = new List<Profile>();
            }

            if (CheckIfUserHasAlreadySavePost(post, profile.OriginalId))
            {
                int index = post.Favorites.FindIndex(p => p.OriginalId == profile.OriginalId);
                post.Favorites.RemoveAt(index);
            }
            else
            {
                post.Favorites.Add(profile);
            }

            return await Update(post);
        }

        private bool CheckIfUserHasAlreadySavePost(Post post, int originalId)
        {
            foreach (Profile profile in post.Favorites)
            {
                if (profile.OriginalId == originalId)
                {
                    return true;
                }
            }
            return false;
        }

        public async Task<Post> GetById(string id)
        {
            return await _postRepository.GetById(id);
        }

        public async Task<IEnumerable<Post>> GetAll()
        {
            return await _postRepository.GetAll();
        }

        public async Task<Post> Insert(Post entity)
        {
            foreach(Content content in entity.Contents)
            {
                content.ImageName = await SaveImage(content.ImageFile);
            }
            entity.PublishingDate = DateTime.Now;
            
            Post post = await _postRepository.Insert(entity);
            _postCreatedMessageSender.SendCreatedPost(post);
            
            return post;
        }

        public async Task<Post> Update(Post entity)
        {
            await _postRepository.Update(entity);
            return entity;
        }

        public async Task Delete(string id)
        {
            await _postRepository.Delete(id);
        }

        public async Task<string> SaveImage(IFormFile imageFile)
        {
            string imageName = new String(Path.GetFileNameWithoutExtension(imageFile.FileName).Take(10).ToArray()).Replace(' ', '-');
            imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(imageFile.FileName);
            var imagePath = Path.Combine(_hostEnvironment.ContentRootPath, "wwwroot", imageName);
            using (var fileStream = new FileStream(imagePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(fileStream);
            }
            return imageName;
        }  
    }
}
