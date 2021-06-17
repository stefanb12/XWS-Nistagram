using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StoryMicroservice.Model
{
    public class ProfileStories : User
    {
        public bool IsPrivate { get; set; }
        public int OriginalId { get; set; }
        public List<Story> Stories { get; set; }
        public List<int> Following { get; set; }
        public List<int> CloseFriends { get; set; }
        public string ImageName { get; set; }
        public IFormFile ImageFile { get; set; }
        public string ImageSrc { get; set; }

        public ProfileStories() : base()
        {
        }

        public List<Story> GetActiveStories()
        {
            return GetAllStories().Where(s => s.PublishingDate.AddHours(24) > DateTime.Now && s.PublishingDate < DateTime.Now).ToList();
        }

        public IEnumerable<Story> GetAllStories()
        {
            return this.Stories;
        }

        public bool IsFollowing(int profileId)
        {
            foreach (int id in Following)
            {
                if (id == profileId)
                {
                    return true;
                }
            }
            return false;
        }

        public bool IsCloseFriend(int profileId)
        {
            foreach (int id in CloseFriends)
            {
                if (id == profileId)
                {
                    return true;
                }
            }
            return false;
        }
    }
}
