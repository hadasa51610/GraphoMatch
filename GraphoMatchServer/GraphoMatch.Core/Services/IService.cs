using GraphoMatch.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GraphoMatch.Core.Services
{
    public interface IService<T> where T : class
    {
        Task<IEnumerable<T>> GetAsync();
        Task<T?> GetByIdAsync(int id);
        Task<T> UpdateAsync(int id, T entity);
        Task<T> AddAsync(T entity);
        Task<bool> RemoveAsync(int id);
    }
}