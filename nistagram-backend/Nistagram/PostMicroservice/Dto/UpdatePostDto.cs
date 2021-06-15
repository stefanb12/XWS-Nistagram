namespace PostMicroservice.Dto
{
    public class UpdatePostDto
    {
        public string Text { get; set; }
        public int PostId { get; set; }
        public ProfileDto Publisher { get; set; }

        public UpdatePostDto() {}
    }
}
