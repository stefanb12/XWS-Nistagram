using System;

namespace PostMicroservice.Model
{
    public class Comment 
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public DateTime Date { get; set; }
        public int PublisherId { get; set; }
        public virtual Profile Publisher { get; set; }
        public int PostId { get; set; }
        public virtual Post Post { get; set; }

        public Comment()
        {
        }
    }
}
