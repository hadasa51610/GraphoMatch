﻿using GraphoMatch.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GraphoMatch.Core.Repositories
{
    public interface IHandWritingRepository:IRepository<HandWriting>
    {
        Task<IEnumerable<HandWriting>> GetByUserId(int userId);
        //Task<string> AnalyzeHandwritingAsync(int userId);
    }
}
