using GraphoMatch.Core.Models;
using GraphoMatch.Core.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GraphoMatch.Data.Repositories
{
    public class HandWritingRepository : Repository<HandWriting>, IHandWritingRepository
    {
        private readonly DbSet<HandWriting> _handWriters;
        public HandWritingRepository(DataContext context) : base(context)
        {
            _handWriters = context.Set<HandWriting>();
        }

        public async Task<IEnumerable<HandWriting>> GetByUserId(int userId)
        {
            return await _handWriters.Where(x => x.UserId == userId && (x.FileName.Contains(".png") || x.FileName.Contains(".JPG"))).ToListAsync();
        }
    }
}
