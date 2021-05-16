using Microsoft.EntityFrameworkCore;
using ProfileMicroservice.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProfileMicroservice.Repository
{
    public class MySqlRepository<E> : IRepository<E> where E : class
    {
        protected readonly ProfileDbContext _context;

        public MySqlRepository(ProfileDbContext context)
        {
            _context = context;
        }

        public E GetById(int id)
        {
            return _context.Set<E>().Find(id);
        }

        public IEnumerable<E> GetAll()
        {
            return _context.Set<E>();
        }

        public E Insert(E entity)
        {
            _context.Set<E>().Add(entity);
            _context.SaveChanges();
            return entity;
        }

        public E Update(E entity)
        {
            _context.Entry(entity).State = EntityState.Modified;
            _context.SaveChanges();
            return entity;
        }

        public void Delete(E entity)
        {
            _context.Set<E>().Remove(entity);
            _context.SaveChanges();
        }

    }
}
