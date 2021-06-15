﻿using Microsoft.EntityFrameworkCore;
using PostMicroservice.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PostMicroservice.Repository
{
    public class MySqlRepository<E> : IRepository<E> where E : class
    {
        protected readonly PostDbContext _context;

        public MySqlRepository(PostDbContext context)
        {
            _context = context;
        }

        public async Task<E> GetById(int id)
        {
            return await _context.Set<E>().FindAsync(id);
        }

        public async Task<IEnumerable<E>> GetAll()
        {
            return await _context.Set<E>().ToListAsync();
        }

        public async Task<E> Insert(E entity)
        {
            _context.Set<E>().Add(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task<E> Update(E entity)
        {
            _context.Entry(entity).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task Delete(E entity)
        {
            _context.Set<E>().Remove(entity);
            await _context.SaveChangesAsync();
        }

    }
}
