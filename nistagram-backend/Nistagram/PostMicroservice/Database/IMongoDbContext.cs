using MongoDB.Driver;
using PostMicroservice.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PostMicroservice.Database
{
    public interface IMongoDbContext
    {
        IMongoCollection<Post> GetCollection<Post>(string name);
    }
}
