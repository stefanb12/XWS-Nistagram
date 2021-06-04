using MongoDB.Bson;
using MongoDB.Driver;
using PostMicroservice.Database;
using PostMicroservice.Model;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PostMicroservice.Repository
{
    public abstract class MongoDbRepository<TDocument> : IRepository<TDocument> where TDocument : IDocument
    {
        protected readonly IMongoDatabase _db;
        protected IMongoCollection<TDocument> _dbCollection;

        protected MongoDbRepository(IMongoDbContext context)
        {
            _db = context.GetDatabase();
            _dbCollection = _db.GetCollection<TDocument>(typeof(TDocument).Name);
        }

        public async Task<TDocument> GetById(string id)
        {
            var objectId = new ObjectId(id);

            FilterDefinition<TDocument> filter = Builders<TDocument>.Filter.Eq("_id", objectId);

            return await _dbCollection.FindAsync(filter).Result.FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<TDocument>> GetAll()
        {
            var all = await _dbCollection.FindAsync(Builders<TDocument>.Filter.Empty);
            return await all.ToListAsync();
        }

        public async Task<TDocument> Insert(TDocument obj)
        {
            if (obj == null)
            {
                throw new ArgumentNullException(typeof(TDocument).Name + " object is null");
            }
            await _dbCollection.InsertOneAsync(obj);
            return obj;
        }

        public async Task<TDocument> Update(TDocument obj)
        {
            await _dbCollection.ReplaceOneAsync(Builders<TDocument>.Filter.Eq("_id", new ObjectId(obj.Id)), obj);
            return obj;
        }

        public async Task Delete(string id)
        {
            var objectId = new ObjectId(id);
            await _dbCollection.DeleteOneAsync(Builders<TDocument>.Filter.Eq("_id", objectId));
        }
    }
}
