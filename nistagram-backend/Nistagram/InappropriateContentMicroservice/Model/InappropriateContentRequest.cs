namespace InappropriateContentMicroservice.Model
{
    public class InappropriateContentRequest
    {
        public long Id { get; set; }
        public string ReportComment { get; set; }
        public bool Processed { get; set; }
        public Profile Sender { get; set; }
        public Post Post { get; set; }
        public Story Story { get; set; }

        public InappropriateContentRequest()
        {
        }
    }
}
