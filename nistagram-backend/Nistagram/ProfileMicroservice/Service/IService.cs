﻿using System.Collections.Generic;
using System.Threading.Tasks;

namespace ProfileMicroservice.Service
{
    public interface IService<E> where E : class
    {
        Task<E> GetById(int id);
        Task<IEnumerable<E>> GetAll();
        Task<E> Insert(E entity);
        Task<E> Update(E entity);
        Task Delete(E entity);
    }
}
