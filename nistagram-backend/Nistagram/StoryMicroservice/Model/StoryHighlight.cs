using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;

namespace StoryMicroservice.Model
{
    public class StoryHighlight : Document
    {
        public string Name { get; set; }
        public int PublisherId { get; set; }
        public List<Story> Stories { get; set; }

        public StoryHighlight()
        {
        }
    }
}
