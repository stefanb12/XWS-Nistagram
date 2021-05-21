namespace PostMicroservice.Model
{
    public class Location : Document
    {
        public string Address { get; set; }
        public City City { get; set; }

        public Location()
        {
        }
    }
}
