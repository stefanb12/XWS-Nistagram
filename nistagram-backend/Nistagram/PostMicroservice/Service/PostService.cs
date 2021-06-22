using Microsoft.AspNetCore.Hosting;
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

        public PostService(IPostRepository postRepository, IProfileService profileService, IPostCreatedMessageSender postCreatedMessageSender)
        {
            _postRepository = postRepository;
            _profileService = profileService;
            _postCreatedMessageSender = postCreatedMessageSender;
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
            return profilePosts.OrderByDescending(post => post.PublishingDate).ToList();
        }

        public async Task<List<Post>> GetFavoritePostsForProfile(int profileId)
        {
            List<Post> favoritePosts = new List<Post>();
            foreach (Post post in await GetAll())
            {
                if(post.Favorites != null)
                {
                    foreach (PostFavorite postFavorite in post.Favorites)
                    {
                        if (postFavorite.Favorite.OriginalId == profileId)
                        {
                            favoritePosts.Add(post);
                            break;
                        }
                    }
                }       
            }
            return favoritePosts.OrderByDescending(post => post.PublishingDate).ToList();
        }

        public async Task<List<Post>> GetLikedAndDislikedPosts(int profileId)
        {
            List<Post> likedAndDislikedPosts = new List<Post>();
            foreach (Post post in await GetAll())
            {
                if (post.Likes != null)
                {
                    foreach (PostLike postLike in post.Likes)
                    {
                        if (postLike.Like.OriginalId == profileId)
                        {
                            likedAndDislikedPosts.Add(post);
                            break;
                        }
                    }
                }
                if (post.Dislikes != null)
                {
                    foreach (PostDislike postDislike in post.Dislikes)
                    {
                        if (postDislike.Dislike.OriginalId == profileId)
                        {
                            likedAndDislikedPosts.Add(post);
                            break;
                        }
                    }
                }
            }
            return likedAndDislikedPosts.OrderByDescending(post => post.PublishingDate).ToList();
        }

        public async Task<List<Post>> GetAllPublicPosts(int profileId)
        {
            List<Post> publicPosts = new List<Post>();
            Profile loggedUser = await _profileService.GetProfileByOriginalId(profileId);

            foreach (Post post in await GetAll())    
            {
                foreach (Profile profile in await _profileService.GetAllPublicProfiles())
                {
                    if (profile.OriginalId == post.Publisher.OriginalId && profileId != post.Publisher.OriginalId && !DoesProfileExistInMuted(loggedUser, post.PublisherId))
                    {
                        publicPosts.Add(post);
                    }
                }
            }
            return publicPosts.OrderByDescending(post => post.PublishingDate).ToList();
        }

        public async Task<List<Post>> GetPostsFromFollowedProfiles(int profileId)
        {
            List<Post> posts = new List<Post>();
            Profile profile = await _profileService.GetProfileByOriginalId(profileId);

            foreach (Post post in await GetAll())
            {
                if (!DoesProfileExistInMuted(profile, post.PublisherId) && !post.Publisher.Deactivated)
                {
                    if (profileId == post.Publisher.OriginalId)
                    {
                        posts.Add(post);
                        continue;
                    }

                    foreach (ProfileFollowing profileFollowing in profile.Following)
                    {
                        if (profileFollowing.FollowingId == post.Publisher.OriginalId || profileId == post.Publisher.OriginalId)
                        {
                            posts.Add(post);
                        }
                    }
                }   
            }
            return posts.OrderByDescending(post => post.PublishingDate).ToList();
        }

        private bool DoesProfileExistInMuted(Profile profile, int id)
        {
            if(profile != null)
            {
                if (profile.MutedProfiles != null)
                {
                    if (profile.MutedProfiles.Exists(pf => pf.MutedProfileId == id))
                    {
                        return true;
                    }
                }  
            }
            return false;
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

        public async Task<Post> LikePost(Post post, Profile p)
        {
            Profile profile = await _profileService.GetById(p.OriginalId);
            if (post.Likes == null)
            {
                post.Likes = new List<PostLike>();
            }

            if(CheckIfUserHasAlreadyLikedPost(post, profile.OriginalId))
            {
                foreach(PostLike postLike in post.Likes)
                {
                    if(postLike.LikeId == profile.OriginalId)
                    {
                        post.Likes.Remove(postLike);
                        break;
                    }
                }
            } else
            {
                post = await DeleteUserFromDislikesIfExistThere(post, profile);
                PostLike postLike = new PostLike();
                postLike.PostId = post.Id;
                postLike.LikeId = profile.Id;
                post.Likes.Add(postLike);
            }

            return await Update(post);
        }

        public async Task<Post> DisikePost(Post post, Profile p)
        {
            Profile profile = await _profileService.GetById(p.OriginalId);
            if (post.Dislikes == null)
            {
                post.Dislikes = new List<PostDislike>();
            }

            if (CheckIfUserHasAlreadyDislikedPost(post, profile.OriginalId))
            {
                foreach (PostDislike postDislike in post.Dislikes)
                {
                    if (postDislike.DislikeId == profile.OriginalId)
                    {
                        post.Dislikes.Remove(postDislike);
                        break;
                    }
                }
            }
            else
            {
                post = await DeleteUserFromLikesIfExistThere(post, profile);
                PostDislike postDislike = new PostDislike();
                postDislike.PostId = post.Id;
                postDislike.DislikeId = profile.Id;
                post.Dislikes.Add(postDislike);
            }

            return await Update(post);
        }

        private async Task<Post> DeleteUserFromDislikesIfExistThere(Post post, Profile profile)
        {
            if (post.Dislikes != null)
            {
                if (CheckIfUserHasAlreadyDislikedPost(post, profile.OriginalId))
                {
                    foreach (PostDislike postDislike in post.Dislikes)
                    {
                        if (postDislike.DislikeId == profile.OriginalId)
                        {
                            post.Dislikes.Remove(postDislike);
                            post = await Update(post);
                            break;
                        }
                    }
                }
            }
            return post;
        }

        private async Task<Post> DeleteUserFromLikesIfExistThere(Post post, Profile profile)
        {
            if (post.Dislikes != null)
            {
                if (CheckIfUserHasAlreadyLikedPost(post, profile.OriginalId))
                {
                    foreach (PostLike postLike in post.Likes)
                    {
                        if (postLike.LikeId == profile.OriginalId)
                        {
                            post.Likes.Remove(postLike);
                            post = await Update(post);
                            break;
                        }
                    }
                }
            }
            return post;
        }

        private bool CheckIfUserHasAlreadyLikedPost(Post post, int originalId)
        {
            foreach(PostLike postLike in post.Likes)
            {
                if (postLike.Like.OriginalId == originalId)
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
                if (post.Location != null && !post.Publisher.IsPrivate) 
                    if (formatAddress(post) == searchParam)
                        searchedPosts.Add(post);
                
                if (post.Tags != null && !post.Publisher.IsPrivate)
                    if (getTags(post.Tags).Contains(searchParam))
                        searchedPosts.Add(post);
            }
            return searchedPosts;
        }

        public async Task<List<Post>> GetSearchResultWithoutBlockedAndMuted(string searchParam, int id)
        {
            List<Post> searchedPosts = await GetSearchResult(searchParam);
            Profile profile = await _profileService.GetById(id);
            List<Post> result = new List<Post>();

            foreach (Post post in searchedPosts)
            {
                if (await DoesExistInMutedOrBlocked(profile.Id, post.PublisherId) == false)
                {
                    result.Add(post);
                }
            }

            return result;
        }

        private async Task<bool> DoesExistInMutedOrBlocked(int profileId, int id)
        {
            Profile profile = await _profileService.GetById(profileId);
            Profile profileBlocked = await _profileService.GetById(id);
            // || profileBlocked.BlockedProfiles.Exists(pf => pf.BlockedProfileId != profileId)
            if (profile.MutedProfiles.Exists(pf => pf.MutedProfileId == id))
            {
                return true;
            }else if (profile.BlockedProfiles.Exists(pf => pf.BlockedProfileId == id))
            {
                return true;
            }else if (profileBlocked.BlockedProfiles.Exists(pf => pf.BlockedProfileId != profileId))
            {
                return true;
            }
            return false;
        }

        public List<string> getTags(List<Tag> tags)
        {
            List<string> result = new List<string>();
            foreach (Tag tag in tags)
            {
                result.Add(tag.Content);
            }
            return result;
        }

        public string formatAddress(Post post) {
            if (post.Location.Address == "" || post.Location.Address == null)
                return post.Location.City + ", " + post.Location.Country;
            else
                return post.Location.Address + ", " + post.Location.City + ", " + post.Location.Country;
        }

        private bool CheckIfUserHasAlreadyDislikedPost(Post post, int originalId)
        {
            foreach (PostDislike postDislike in post.Dislikes)
            {
                if (postDislike.Dislike.OriginalId == originalId)
                {
                    return true;
                }
            }
            return false;
        }

        public async Task<Post> SavePostAsFavorite(Post post, Profile p)
        {
            Profile profile = await _profileService.GetById(p.OriginalId);
            if (post.Favorites == null)
            {
                post.Favorites = new List<PostFavorite>();
            }

            if (CheckIfUserHasAlreadySavePost(post, profile.OriginalId))
            {
                foreach (PostFavorite postFavorite in post.Favorites)
                {
                    if (postFavorite.FavoriteId == profile.OriginalId)
                    {
                        post.Favorites.Remove(postFavorite);
                        break;
                    }
                }
            }
            else
            {
                PostFavorite postFavorite = new PostFavorite();
                postFavorite.PostId = post.Id;
                postFavorite.FavoriteId = profile.Id;
                post.Favorites.Add(postFavorite);
            }

            return await Update(post);
        }

        private bool CheckIfUserHasAlreadySavePost(Post post, int originalId)
        {
            foreach (PostFavorite postFavorite in post.Favorites)
            {
                if (postFavorite.Favorite.OriginalId == originalId)
                {
                    return true;
                }
            }
            return false;
        }

        public async Task<Post> GetById(int id)
        {
            Post post = await _postRepository.GetById(id);
            if (post.Publisher.Deactivated || post.Deleted)
            {
                post = null;
            }
            return post;
        }

        public async Task<IEnumerable<Post>> GetAll()
        {
            List<Post> result = new List<Post>();
            IEnumerable<Post> posts = await _postRepository.GetAll();
            foreach (Post post in posts)
            {
                if (!post.Publisher.Deactivated && !post.Deleted)
                {
                    result.Add(post);
                }
            }
            return result;
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

        public async Task Delete(int id)
        {
            Post post = await _postRepository.GetById(id);
            await _postRepository.Delete(post);
        }

        public async Task<string> SaveImage(IFormFile imageFile)
        {
            string imageName = new String(Path.GetFileNameWithoutExtension(imageFile.FileName).Take(10).ToArray()).Replace(' ', '-');
            imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(imageFile.FileName);
            var imagePath = Path.Combine("wwwroot", imageName);
            using (var fileStream = new FileStream(imagePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(fileStream);
            }
            return imageName;
        }  
    }
}
