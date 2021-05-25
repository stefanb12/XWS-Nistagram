namespace PostMicroservice.Model
{
    public class Profile : User
    {
        public bool Private { get; set; }

        public Profile() : base()
        {
        }
    }
}
