using GraphoMatch.Core.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace GraphoMatch.API.Models
{
    public class HandWritingPostModel
    {
        public string FileName { get; set; }
        //public string Url { get; set; }
        public int UserId { get; set; }
        public string Type { get; set; }
        public IFormFile ImageFile { get; set; }
    }
}
