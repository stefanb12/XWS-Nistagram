namespace StoryMicroservice.Model
{
    public class Location
    {
        public long Id { get; set; }
        public string Address { get; set; }
        public City City { get; set; }

        public Location()
        {
        }
    }
}
