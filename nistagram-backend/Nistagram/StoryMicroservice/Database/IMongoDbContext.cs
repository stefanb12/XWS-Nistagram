using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StoryMicroservice.Database
{
    public interface IMongoDbContext
    {
        IMongoCollection<Story> GetCollection<Story>(string name);
        IMongoDatabase GetDatabase();
    }
}
