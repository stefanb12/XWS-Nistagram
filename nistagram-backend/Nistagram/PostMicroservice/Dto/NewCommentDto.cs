namespace PostMicroservice.Dto
{
    public class NewCommentDto
    {
        public string Text { get; set; }
        public string PostId { get; set; }
        public ProfileDto Publisher { get; set; }

        public NewCommentDto() {}
    }
}
