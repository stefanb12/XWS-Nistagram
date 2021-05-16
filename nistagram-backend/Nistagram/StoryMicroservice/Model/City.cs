namespace StoryMicroservice.Model
{
    public class City
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public Country Country { get; set; }

        public City()
        {
        }
    }
}
