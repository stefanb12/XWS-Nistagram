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
            return Environment.GetEnvironmentVariable("DATABASE_NAME") ?? "StoryMicroserviceDb";
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

            if (!CollectionExists(_db, "Profile"))
            {
                _db.CreateCollection("Profile");
                var profileCollection = _db.GetCollection<Profile>("Profile");
                var profileData = CreateProfileData();
                await profileCollection.InsertManyAsync(profileData);
            }
        }

        private IEnumerable<Story> CreateStoryData()
        {
            var storyData = new List<Story> {
                new Story
                {
                    Id = "60bd70ad107c45e92fd80692",
                    ForCloseFriends = false,
                    PublishingDate = new DateTime(2021, 07, 22, 15, 29, 59),
                    WebsiteLink = null,
                    IsCommercial = false,
                    PublisherId = 1,
                    ImageName = "sc2210938836.jpg",
                    Deleted = false
                },
                new Story
                {
                    Id = "60bd70ad107c45e92fd80693",
                    ForCloseFriends = false,
                    PublishingDate = new DateTime(2021, 07, 22, 14, 59, 59),
                    WebsiteLink = null,
                    IsCommercial = false,
                    PublisherId = 2,
                    ImageName = "sc1211007001.jpg",
                    Deleted = false
                },
                new Story
                {
                    Id = "60bd70ad107c45e92fd80694",
                    ForCloseFriends = false,
                    PublishingDate = new DateTime(2021, 07, 22, 12, 59, 59),
                    WebsiteLink = null,
                    IsCommercial = false,
                    PublisherId = 2,
                    ImageName = "2212424861.png",
                    Deleted = false
                },
                new Story
                {
                    Id = "60bd70ad107c45e92fd80695",
                    ForCloseFriends = false,
                    PublishingDate = new DateTime(2021, 07, 22, 16, 59, 59),
                    WebsiteLink = null,
                    IsCommercial = false,
                    PublisherId = 3,
                    ImageName = "2212424862.png",
                    Deleted = false
                },
                new Story
                {
                    Id = "60bd70ad107c45e92fd80696",
                    ForCloseFriends = true,
                    PublishingDate = new DateTime(2021, 07, 22, 14, 59, 59),
                    WebsiteLink = null,
                    IsCommercial = false,
                    PublisherId = 4,
                    ImageName = "2212424863.png",
                    Deleted = false
                },
                new Story
                {
                    Id = "60bd70ad107c45e92fd80697",
                    ForCloseFriends = true,
                    PublishingDate = new DateTime(2021, 07, 10, 22, 59, 59),
                    WebsiteLink = "http://localhost:3001/app/singleProduct/2",
                    IsCommercial = true,
                    PublisherId = 4,
                    ImageName = "sneakers.png",
                    Deleted = false
                }
            };

            return storyData;
        }

        private IEnumerable<Profile> CreateProfileData()
        {
            var profileData = new List<Profile> {
                new Profile {
                    OriginalId = 1 ,
                    Username = "stefanb",
                    IsPrivate = false,
                    Deactivated = false,
                    ImageName = "user1213352029.jpg",
                    Following = new List<int>() {2, 3, 5},
                    CloseFriends = new List<int>() {2},
                    MutedProfiles = new List<int>() {2}
                },
                new Profile {
                    OriginalId = 2 ,
                    Username = "matijam",
                    IsPrivate = true,
                    Deactivated = false,
                    ImageName = "user2213352029.jpg",
                    Following = new List<int>() {1, 4},
                    CloseFriends = new List<int>() {3},
                    MutedProfiles = new List<int>()
                },
                new Profile {
                    OriginalId = 3 ,
                    Username = "aleksai",
                    IsPrivate = true,
                    Deactivated = false,
                    ImageName = "user3213352029.png",
                    Following = new List<int>() {1, 2},
                    CloseFriends = new List<int>() {2},
                    MutedProfiles = new List<int>()
                },
                new Profile {
                    OriginalId = 4 ,
                    Username = "stefans",
                    IsPrivate = false,
                    Deactivated = false,
                    ImageName = "user4213352029.png",
                    Following = new List<int>(),
                    CloseFriends = new List<int>(),
                    MutedProfiles = new List<int>()
                },
                new Profile {
                    OriginalId = 5 ,
                    Username = "majam",
                    IsPrivate = false,
                    Deactivated = false,
                    ImageName = "user5213352029.jpg",
                    Following = new List<int>(),
                    CloseFriends = new List<int>(),
                    MutedProfiles = new List<int>()
                }
            };

            return profileData;
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
