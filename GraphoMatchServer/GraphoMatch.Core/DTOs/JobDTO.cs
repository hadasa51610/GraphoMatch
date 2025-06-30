using GraphoMatch.Core.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GraphoMatch.Core.DTOs
{
    public class JobDTO
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Company { get; set; }
        public string Description { get; set; }
        public string Location { get; set; }
        public DateTime Posted { get; set; }
        public List<string> Tags { get; set; }
        public List<UserDto> Seekers { get; set; }
        public string Salary { get; set; }

        public JobDTO()
        {
            Tags = new List<string>();
            Seekers = new List<UserDto>();
        }
    }
}
