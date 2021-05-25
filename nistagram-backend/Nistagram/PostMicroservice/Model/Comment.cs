using MongoDB.Bson;
using System;

namespace PostMicroservice.Model
{
    public class Comment : Document
    {
        public string Text { get; set; }
        public DateTime Date { get; set; }
        public Profile Publisher { get; set; }

        public Comment()
        {
            Id = ObjectId.GenerateNewId().ToString();
        }
    }
}
