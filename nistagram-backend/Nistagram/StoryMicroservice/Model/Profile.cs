using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;

namespace StoryMicroservice.Model
{
    public class Profile : User
    {
        public bool Private { get; set; }
        public int OriginalId { get; set; }

        public Profile() : base()
        {
        }
    }
}
