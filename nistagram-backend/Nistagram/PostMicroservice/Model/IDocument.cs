using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace PostMicroservice.Model
{
    public interface IDocument
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
    }
}
