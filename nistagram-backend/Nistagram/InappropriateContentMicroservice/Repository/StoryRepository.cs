using InappropriateContentMicroservice.Database;
using InappropriateContentMicroservice.Model;

namespace InappropriateContentMicroservice.Repository
{
    public class StoryRepository : MySqlRepository<Story>, IStoryRepository
    {
        public StoryRepository(InappropriateContentDbContext context)
               : base(context)
        {
        }
    }
}