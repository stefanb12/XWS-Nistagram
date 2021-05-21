using System;

namespace ChatMicroservice.Model
{
    public class Message
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public DateTime Date { get; set; }
        public Profile Profile { get; set; }
        public Content Content { get; set; }
        public Post Post { get; set; }
        public Story Story { get; set; }

        public Message()
        {
        }
    }
}
