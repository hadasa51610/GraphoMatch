using GraphoMatch.Core.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace GraphoMatch.API.Models
{
    public class FeedbackPostModel
    {
        public int UserId { get; set; }
        public User User { get; set; }
        public string Content { get; set; }
    }
}
