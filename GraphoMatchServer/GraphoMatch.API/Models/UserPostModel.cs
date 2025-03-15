﻿using GraphoMatch.Core.Models;

namespace GraphoMatch.API.Models
{
    public class UserPostModel
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public Role Role { get; set; }
        public int FeedbackId { get; set; }
    }
}
