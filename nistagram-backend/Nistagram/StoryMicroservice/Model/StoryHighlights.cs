using System.Collections.Generic;

namespace StoryMicroservice.Model
{
    public class StoryHighlights
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public Profile Profile { get; set; }
        public List<Story> Story { get; set; }

        public StoryHighlights()
        {
        }
    }
}
