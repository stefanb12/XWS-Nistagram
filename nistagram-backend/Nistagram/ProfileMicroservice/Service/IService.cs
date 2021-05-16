using System.Collections.Generic;

namespace ProfileMicroservice.Service
{
    public interface IService<E> where E : class
    {
        E GetById(int id);
        IEnumerable<E> GetAll();
        E Insert(E entity);
        E Update(E entity);
        void Delete(E entity);
    }
}
