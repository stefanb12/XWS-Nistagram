using StoryMicroservice.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StoryMicroservice.Repository
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
