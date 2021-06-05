using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StoryMicroservice.Model
{
    public class ProfileStories : User
    {
        public bool Private { get; set; }
        public int OriginalId { get; set; }
        public List<Story> Stories { get; set; }

        public ProfileStories() : base()
        {
        }
    }
}
