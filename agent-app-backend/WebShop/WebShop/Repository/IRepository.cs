﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebShop.Repository
{
    public interface IRepository<E> where E : class
    {
        Task<E> GetById(int id);
        Task<IEnumerable<E>> GetAll();
        Task<E> Insert(E entity);
        Task<E> Update(E entity);
        Task Delete(E entity);
    }
}
