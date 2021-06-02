using MongoDB.Bson;

namespace StoryMicroservice.Model
{
    public class User : Document
    {
        public string Username { get; set; }

        public User()
        {
            Id = ObjectId.GenerateNewId().ToString();
        }
    }
}
