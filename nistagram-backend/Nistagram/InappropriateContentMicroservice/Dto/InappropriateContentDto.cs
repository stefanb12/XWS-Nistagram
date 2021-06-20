namespace InappropriateContentMicroservice.Dto
{
    public class InappropriateContentDto
    {
        public int Id { get; set; }
        public string ReportComment { get; set; }
        public bool Processed { get; set; }
        public bool IsPost { get; set; }
        public int SenderId { get; set; }
        public int PostId { get; set; }
        public string StoryId { get; set; }
        public string Username { get; set; }
        public string ActionTaken { get; set; }

        public InappropriateContentDto()
        {
        }
    }
}
