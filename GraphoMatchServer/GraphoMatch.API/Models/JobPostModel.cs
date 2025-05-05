namespace GraphoMatch.API.Models
{
    public class JobPostModel
    {
        public string Title { get; set; }
        public string Company { get; set; }
        public string Description { get; set; }
        public string Location { get; set; }
        public List<string> Tags { get; set; }
        public string Salary { get; set; }

        public JobPostModel() { 
            Tags=new List<string>();
        }
    }
}