using NotificationMicroservice.Database;
using NotificationMicroservice.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NotificationMicroservice.Repository
{
    public class NotificationRepository : MySqlRepository<Notification>, INotificationRepository
    {
        public NotificationRepository(NotificationDbContext context)
               : base(context)
        {
        }
    }
}
