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
            return Environment.GetEnvironmentVariable("DATABASE_NAME") ?? "PostMicroserviceDb"; 
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
            if (!CollectionExists(_db, "Profile"))
            {
                _db.CreateCollection("Profile");
                var profileCollection = _db.GetCollection<Profile>("Profile");
                var profileData = CreateProfileData();
                await profileCollection.InsertManyAsync(profileData);
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
                new Post { 
                    Tags = new List<string> {"Nature" } , 
                    Description = "Nature", 
                    PublishingDate = new DateTime(2021, 05, 01, 11, 01, 01), 
                    Location = new Location { Address = "", City = "Nis", Country = "Serbia"}, 
                    Comments = new List<Comment> { new Comment { Text = "Excellent", Date = new DateTime(2021, 05, 30, 10, 10, 10), Publisher = new Profile { Username = "aleksai", OriginalId = 3, IsPrivate = false, ImageName= "user3213352029.png" } } },
                    Dislikes = new List<Profile> { new Profile { OriginalId = 5, Username = "majam", ImageName = "user5213352029.jpg" } },
                    Likes = new List<Profile> { new Profile { OriginalId = 3, Username = "aleksai", ImageName = "user3213352029.png" }, new Profile { OriginalId = 4, Username = "stefans", ImageName = "user4213352029.png" } },
                    Favorites = new List<Profile> { new Profile { OriginalId = 2, Username = "matijam", ImageName = "user2213352029.jpg" } },
                    Publisher = new Profile { Username = "stefanb", OriginalId = 1, IsPrivate = false, ImageName= "user1213352029.jpg" },
                    Contents = new List<Content> { new Content { ImageName = "2212424861.png" } }   
                },
                new Post {
                    Tags = new List<string> { "Waterfall" } ,
                    Description = "Waterfall",
                    PublishingDate = new DateTime(2021, 06, 01, 19, 10, 10),
                    Location = new Location { Address = "", City = "Despotovac", Country = "Serbia"},
                    Comments = new List<Comment> { new Comment { Text = "Wow :D", Date = new DateTime(2021, 06, 02, 10, 10, 10), Publisher = new Profile { OriginalId = 1, Username = "stefanb", IsPrivate = false, ImageName= "user1213352029.jpg" } } },
                    Dislikes = new List<Profile> { },
                    Likes = new List<Profile> { new Profile { OriginalId = 3, Username = "aleksai", IsPrivate = true, ImageName = "user3213352029.png" }, new Profile { OriginalId = 1, Username = "stefanb", IsPrivate = false, ImageName = "user1213352029.jpg" } },
                    Favorites = new List<Profile> { new Profile { OriginalId = 3, Username = "aleksai", ImageName = "user3213352029.png" } },
                    Publisher = new Profile { Username = "matijam", OriginalId = 2, IsPrivate = true, ImageName= "user2213352029.jpg" },
                    Contents = new List<Content> { new Content { ImageName = "2212424862.png" } }
                },
                new Post {
                    Tags = new List<string> { "Mountain", "Skiing", "Vacation" } ,
                    Description = "Vacation",
                    PublishingDate = new DateTime(2021, 01, 01, 18, 10, 10),
                    Location = new Location { Address = "", City = "Kopaonik", Country = "Serbia"},
                    Comments = new List<Comment> { new Comment { Text = "You are lucky! :D", Date = new DateTime(2021, 01, 02, 11, 11, 11), Publisher = new Profile { OriginalId = 2, Username = "matijam", IsPrivate = true, ImageName= "user2213352029.jpg" } } },
                    Dislikes = new List<Profile> { },
                    Likes = new List<Profile> { new Profile { OriginalId = 2, Username = "matijam", ImageName = "user2213352029.jpg" }, new Profile { OriginalId = 1, Username = "stefanb", IsPrivate = false, ImageName = "user1213352029.jpg" } },
                    Favorites = new List<Profile> { },
                    Publisher = new Profile { Username = "stefans", OriginalId = 4, IsPrivate = false, ImageName= "user4213352029.png" },
                    Contents = new List<Content> { new Content { ImageName = "2212424862.png" } }
                },
            };

            return postData;
        }

        private IEnumerable<Profile> CreateProfileData()
        {
            var profileData = new List<Profile> {
                new Profile {
                    OriginalId = 1 ,
                    Username = "stefanb",
                    IsPrivate = false,
                    ImageName = "user1213352029.jpg"
                },
                new Profile {
                    OriginalId = 2 ,
                    Username = "matijam",
                    IsPrivate = true,
                    ImageName = "user2213352029.jpg"
                },
                new Profile {
                    OriginalId = 3 ,
                    Username = "aleksai",
                    IsPrivate = true,
                    ImageName = "user3213352029.png"
                },
                new Profile {
                    OriginalId = 4 ,
                    Username = "stefans",
                    IsPrivate = false,
                    ImageName = "user4213352029.png"
                },
                new Profile {
                    OriginalId = 5 ,
                    Username = "majam",
                    IsPrivate = false,
                    ImageName = "user5213352029.jpg"
                }

            };

            return profileData;
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
