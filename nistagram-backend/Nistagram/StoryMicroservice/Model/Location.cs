namespace StoryMicroservice.Model
{
    public class Location
    {
        public int Id { get; set; }
        public string Address { get; set; }
        public City City { get; set; }

        public Location()
        {
        }
    }
}
