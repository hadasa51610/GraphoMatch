using GraphoMatch.Core.Models;

namespace GraphoMatch.API.Models
{
    public class UserPostModel
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Phone { get; set; }
        public string Profession { get; set; }
        public int FeedbackId { get; set; }
    }
}
