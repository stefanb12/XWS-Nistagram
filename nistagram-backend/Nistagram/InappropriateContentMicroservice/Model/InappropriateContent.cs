using InappropriateContentMicroservice.Model.Enum;

namespace InappropriateContentMicroservice.Model
{
    public class InappropriateContent
    {
        public int Id { get; set; }
        public string ReportComment { get; set; }
        public bool Processed { get; set; }
        public bool IsPost { get; set; }
        public int SenderId { get; set; }
        public virtual Profile Sender { get; set; }
        public int PostId { get; set; }
        public virtual Post Post { get; set; }
        public int StoryId { get; set; }
        public virtual Story Story { get; set; }
        public ActionTaken ActionTaken { get; set; }

        public InappropriateContent()
        {
        }
    }
}
