using MongoDB.Bson;
using MongoDB.Driver;
using StoryMicroservice.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StoryMicroservice.Database
{
    public class MongoDbContext : IMongoDbContext
    {
        private IMongoDatabase _db { get; set; }
        private MongoClient _mongoClient { get; set; }
        public  IClientSessionHandle Session { get; set; }
        public MongoDbContext(MongoDbSettings configuration)
        {
            _mongoClient = new MongoClient(configuration.ConnectionString);
            _db = _mongoClient.GetDatabase(configuration.DatabaseName);
            SeedDataAsync(_db).Wait();
        }

        private async Task SeedDataAsync(IMongoDatabase _db)
        {
            if (!CollectionExists(_db, "Story"))
            {
                _db.CreateCollection("Story");
                var storyCollection = _db.GetCollection<Story>("Story");
                var storyData = CreateStoryData();
                await storyCollection.InsertManyAsync(storyData);
            }
        }

        private IEnumerable<Story> CreateStoryData()
        {
            var storyData = new List<Story> {
            };

            return storyData;
        }

        public bool CollectionExists(IMongoDatabase database, string collectionName)
        {
            var filter = new BsonDocument("name", collectionName);
            var options = new ListCollectionNamesOptions { Filter = filter };

            return database.ListCollectionNames(options).Any();
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
