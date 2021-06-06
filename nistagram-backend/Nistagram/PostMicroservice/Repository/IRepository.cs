using MongoDB.Driver;
using PostMicroservice.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PostMicroservice.Repository
{
    public interface IRepository<TDocument> where TDocument : IDocument
    {
        Task<TDocument> GetById(string id);
        Task<IEnumerable<TDocument>> GetAll();
        Task<TDocument> Insert(TDocument obj);
        Task<TDocument> Update(TDocument obj);
        Task Delete(string id);
    }
}
