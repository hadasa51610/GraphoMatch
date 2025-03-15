using Microsoft.EntityFrameworkCore;
using GraphoMatch.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace GraphoMatch.Data.Repositories
{
    public class Repository<T> : IRepository<T> where T : class
    {
        protected readonly DbSet<T> _dbSet;
        public Repository(DataContext context)
        {
            _dbSet = context.Set<T>();
        }

        public async Task<IEnumerable<T>> GetAllAsync()
        {
            return await _dbSet.ToListAsync();
        }

        public async Task<T?> GetByIdAsync(int id)
        {
            return await _dbSet.FindAsync(id);
        }

        public async Task<T> AddAsync(T entity)
        {
            await _dbSet.AddAsync(entity);
            return entity;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            T entity = await _dbSet.FindAsync(id);
            if (entity == null) return false;
            _dbSet.Remove(entity);
            return true;
        }

        public async Task<T> UpdateAsync(int id, T entity)
        {
            T entityToUpdate = await _dbSet.FindAsync(id);
            if (entityToUpdate == null) return entity;
            var properties = typeof(T).GetProperties(BindingFlags.Public | BindingFlags.Instance)
                .Where(prop => prop.Name != "Id");
            foreach (var prop in properties)
            {
                var value = prop.GetValue(entity);
                if (value != null)
                {
                    prop.SetValue(entityToUpdate, value);
                }
            }
            return entityToUpdate;
        }
    }
}
