using NotificationMicroservice.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NotificationMicroservice.Service
{
    public interface INotificationService : IService<Notification>
    {
        Task<Notification> FindNotification(int receiverId, int senderId);
    }
}
