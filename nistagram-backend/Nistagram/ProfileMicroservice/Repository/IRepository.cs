using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProfileMicroservice.Repository
{
    public interface IRepository<E> where E : class
    {
        E GetById(int id);
        IEnumerable<E> GetAll();
        E Insert(E entity);
        E Update(E entity);
        void Delete(E entity);
    }
}
