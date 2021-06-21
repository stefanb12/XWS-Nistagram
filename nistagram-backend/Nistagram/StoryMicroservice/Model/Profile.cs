using Microsoft.AspNetCore.Http;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;

namespace StoryMicroservice.Model
{
    public class Profile : User
    {
        public bool IsPrivate { get; set; }
        public bool Deactivated { get; set; }
        public int OriginalId { get; set; }
        public List<int> Following { get; set; }
        public List<int> CloseFriends { get; set; }
        public List<int> MutedProfiles { get; set; }
        public string ImageName { get; set; }
        [BsonIgnore]
        public IFormFile ImageFile { get; set; }
        [BsonIgnore]
        public string ImageSrc { get; set; }

        public Profile() : base()
        {
        }

        public bool IsFollowingAndNotMuted(int profileId)
        {
            foreach(int id in Following)
            {
                if (id == profileId)
                {
                    return !IsMuted(profileId);
                }
            }
            return false;
        }

        public bool IsMuted(int profileId)
        {
            foreach(int id in MutedProfiles)
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
