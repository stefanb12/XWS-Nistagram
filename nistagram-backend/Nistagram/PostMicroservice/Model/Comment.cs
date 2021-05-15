using System;

namespace PostMicroservice.Model
{
    public class Comment
    {
        public long Id { get; set; }
        public string Text { get; set; }
        public DateTime Date { get; set; }
        public Profile Profile { get; set; }

        public Comment()
        {
        }
    }
}
