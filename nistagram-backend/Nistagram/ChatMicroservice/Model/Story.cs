using System;
using System.Collections.Generic;

namespace ChatMicroservice.Model
{
    public class Story
    {
        public List<string> Tags { get; set; }
        public string Description { get; set; }
        public DateTime PublishingDate { get; set; }
        public List<Content> Contents { get; set; }

        public Story()
        {
        }
    }
}
