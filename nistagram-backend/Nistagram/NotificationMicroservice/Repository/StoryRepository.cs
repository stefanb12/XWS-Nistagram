using NotificationMicroservice.Database;
using NotificationMicroservice.Model;

namespace NotificationMicroservice.Repository
{
    public class StoryRepository : MySqlRepository<Story>, IStoryRepository
    {
        public StoryRepository(NotificationDbContext context)
               : base(context)
        {
        }
    }
}
