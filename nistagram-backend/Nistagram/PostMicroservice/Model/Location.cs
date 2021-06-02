using MongoDB.Bson;

namespace PostMicroservice.Model
{
    public class Location : Document
    {
        public string Address { get; set; }
        public string City { get; set; }
        public string Country { get; set; }

        public Location()
        {
            Id = ObjectId.GenerateNewId().ToString();
        }
    }
}
