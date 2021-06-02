using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StoryMicroservice.Service
{
    public interface IService<E> where E : class
    {
        Task<E> GetById(string id);
        Task<IEnumerable<E>> GetAll();
        Task<E> Insert(E entity);
        Task<E> Update(E entity);
        Task Delete(string id);
    }
}
