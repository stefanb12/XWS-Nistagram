namespace NotificationMicroservice.Model
{
    public class NotificationProfile
    {
        public int Id { get; set; }
        public int NotificationProfileId { get; set; }
        public int ProfileId { get; set; }
        public virtual Profile Profile { get; set; }

        public NotificationProfile() { }
    }
}
