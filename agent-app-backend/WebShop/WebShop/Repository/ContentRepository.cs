using WebShop.Database;
using WebShop.Model;

namespace WebShop.Repository
{
    public class ContentRepository : MySqlRepository<Content>, IContentRepository
    {
        public ContentRepository(WebShopDbContext context)
               : base(context)
    {
    }
}
}
