namespace PostMicroservice.Dto
{
    public class LocationDto
    {
        public int Location_id { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string Country { get; set; }

        public LocationDto() {}
    }
}
