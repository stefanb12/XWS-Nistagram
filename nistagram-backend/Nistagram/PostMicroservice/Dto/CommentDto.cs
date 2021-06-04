using System;

namespace PostMicroservice.Dto
{
    public class CommentDto
    {
        public string Text { get; set; }
        public DateTime Date { get; set; }
        public ProfileDto Publisher { get; set; }
    }
}
