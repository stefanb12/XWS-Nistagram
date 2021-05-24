using Microsoft.Extensions.Options;
using MongoDB.Driver;
using PostMicroservice.Model;

namespace PostMicroservice.Database
{
    public class MongoDbContext : IMongoDbContext
    {
        private IMongoDatabase _db { get; set; }
        private MongoClient _mongoClient { get; set; }
        public IClientSessionHandle Session { get; set; }
        public MongoDbContext(IMongoDbSettings configuration)
        {
            _mongoClient = new MongoClient(configuration.ConnectionString);
            _db = _mongoClient.GetDatabase(configuration.DatabaseName);
        }

        public IMongoCollection<T> GetCollection<T>(string name)
        {
            return _db.GetCollection<T>(name);
        }

        public IMongoDatabase GetDatabase()
        {
            return _db;
        }
    }
}
