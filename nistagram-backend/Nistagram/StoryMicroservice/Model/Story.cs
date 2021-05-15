using System;
using System.Collections.Generic;

namespace StoryMicroservice.Model
{
    public class Story
    {
        public long Id { get; set; }
        public bool Visible { get; set; }
        public bool ForCloseFriends { get; set; }
        public List<string> Tags { get; set; }
        public string Description { get; set; }
        public DateTime PublishingDate { get; set; }
        public List<Content> Content { get; set; }
        public Location Location { get; set; }
        public Profile Profile { get; set; }

        public Story()
        {
        }
    }
}
