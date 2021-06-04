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
            _mongoClient = new MongoClient(CreateConnectionStringFromEnvironment());
            _db = _mongoClient.GetDatabase(CreateDatabaseNameFromEnvironment());
            SeedDataAsync(_db).Wait();
        }

        private string CreateConnectionStringFromEnvironment()
        {
            string server = Environment.GetEnvironmentVariable("DATABASE_HOST") ?? "localhost"; 
            return $"mongodb://{server}:27017";
        }
        private string CreateDatabaseNameFromEnvironment()
        {
            return Environment.GetEnvironmentVariable("DATABASE_NAME") ?? "PostMicroserviceDb"; ;
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
                new Post { Tags = new List<string> {"Nature", "Waterfall" } , Description = "Nature", PublishingDate = new DateTime(2021, 02, 1, 1, 1, 1), Location = new Location { Address = "", City = "Belgrade", Country = "Serbia"}, Comments = new List<Comment> { new Comment { Text = "Excellent", Date = new DateTime(2021, 05, 30, 10, 10, 10), Publisher = new Profile { Username = "user1", OriginalId = 1, IsPrivate = false } } },  Publisher = new Profile { Username = "user1", OriginalId = 1, IsPrivate = false }, Contents = new List<Content> { new Content { ImageName = "2212424861.png" } }, Likes = new List<Profile> { new Profile { OriginalId = 2, Username = "user2" }, new Profile { OriginalId = 3, Username = "user3" } }, Dislikes = new List<Profile> { new Profile { OriginalId = 4, Username = "user4" }, new Profile { OriginalId = 5, Username = "user5" } },  },
                new Post { Description = "Waterfall", PublishingDate = new DateTime(2021, 02, 2, 14, 14, 14), Location = new Location { Address = "Bulevar Cara Lazara", City = "Novi Sad", Country = "Serbia"}, Comments = new List<Comment> { new Comment { Text = "Wow!", Date = new DateTime(2021, 06, 1, 15, 16, 15), Publisher = new Profile { Username = "user2", OriginalId = 2, IsPrivate = false } }, new Comment { Text = "Wooow!", Date = new DateTime(2021, 06, 1, 15, 17, 15), Publisher = new Profile { Username = "user2", OriginalId = 2, IsPrivate = false } }, new Comment { Text = "Wow!", Date = new DateTime(2021, 06, 1, 15, 15, 15), Publisher = new Profile { Username = "user2", OriginalId = 2, IsPrivate = false } }, new Comment { Text = "Woooow!", Date = new DateTime(2021, 06, 1, 18, 15, 15), Publisher = new Profile { Username = "user1", OriginalId = 1, IsPrivate = false } } },  Publisher = new Profile { Username = "user1", OriginalId = 1, IsPrivate = false }, Contents = new List<Content> { new Content { ImageName = "2212424862.png" } }, Likes = new List<Profile> { new Profile { OriginalId = 1, Username = "user2" } },  },
                new Post { PublishingDate = new DateTime(2021, 02, 2, 14, 14, 14), Location = new Location { Address = "", City = "Novi Sad", Country = "Serbia"}, Comments = new List<Comment> { new Comment { Text = "Wooow!", Date = new DateTime(2021, 06, 1, 15, 17, 15), Publisher = new Profile { Username = "user2", OriginalId = 2, IsPrivate = false } } },  Publisher = new Profile { Username = "user3", OriginalId = 3, IsPrivate = false }, Contents = new List<Content> { new Content { ImageName = "2212424863.png" } } }
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
