using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;
using PostMicroservice.Model;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

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
            SeedDataAsync(_db).Wait();
        }

        private async Task SeedDataAsync(IMongoDatabase _db)
        {
            if (!CollectionExists(_db, "Post"))
            {
                _db.CreateCollection("Post");
                var postCollection = _db.GetCollection<Post>("Post");
                var postData = CreatePostData();
                await postCollection.InsertManyAsync(postData);
            }         
        }

        public bool CollectionExists(IMongoDatabase database, string collectionName)
        {
            var filter = new BsonDocument("name", collectionName);
            var options = new ListCollectionNamesOptions { Filter = filter };

            return database.ListCollectionNames(options).Any();
        }

        private IEnumerable<Post> CreatePostData()
        {
            var postData = new List<Post> {
                new Post { Tags = new List<string> {"sport"} , Description = "Football", PublishingDate = new DateTime(2021, 05, 30), Location = new Location { Address = "", City = "Belgrade", Country = "Serbia"}, Comments = new List<Comment> { new Comment { Text = "Excellent", Date = new DateTime(2021, 05, 30), Publisher = new Profile { Username = "user1", OriginalId = 1, IsPrivate = false } } },  Publisher = new Profile { Username = "user1", OriginalId = 1, IsPrivate = false } },
                new Post { Tags = new List<string> {"tv"} , Description = "Basketball", PublishingDate = new DateTime(2021, 05, 30), Location = new Location { Address = "", City = "Belgrade", Country = "Serbia"}, Comments = new List<Comment> { new Comment { Text = "Excellent", Date = new DateTime(2021, 05, 30), Publisher = new Profile { Username = "user2", OriginalId = 2, IsPrivate = false } } },  Publisher = new Profile { Username = "user1", OriginalId = 1, IsPrivate = false } }
            };

            return postData;
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
