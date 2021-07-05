using NotificationMicroservice.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NotificationMicroservice.Service
{
    public interface INotificationService : IService<Notification>
    {
        Task<List<Notification>> UpdateSeenNotifications(int profileId);
        Task<List<Notification>> FindNotificationsForProfile(int profileId);
        Task<Notification> FindFollowRequestNotification(int receiverId, int senderId);
        Task<Notification> FindCampaignRequestNotification(int receiverId, int senderId);
    }
}
