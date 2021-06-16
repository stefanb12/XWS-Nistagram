using InappropriateContentMicroservice.Database;
using InappropriateContentMicroservice.Model;

namespace InappropriateContentMicroservice.Repository
{
    public class InappropriateContentRepository : MySqlRepository<InappropriateContent>, IInappropriateContentRepository
    {
        public InappropriateContentRepository(InappropriateContentDbContext context)
               : base(context)
        {
        }
    }
}
