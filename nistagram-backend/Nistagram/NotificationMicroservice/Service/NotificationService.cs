using NotificationMicroservice.Model;
using NotificationMicroservice.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NotificationMicroservice.Service
{
    public class NotificationService : INotificationService
    {
        private INotificationRepository _notificationRepository;
        private IProfileService _profileService;

        public NotificationService(INotificationRepository notificationRepository, IProfileService profileService)
        {
            _notificationRepository = notificationRepository;
            _profileService = profileService;
        }

        public async Task<List<Notification>> UpdateSeenNotifications(int profileId)
        {
            IEnumerable<Notification> notifications = await FindNotificationsForProfile(profileId);
            List<Notification> updatedNotifications = new List<Notification>();
            foreach(Notification notification in notifications)
            {
                notification.Seen = true;
                updatedNotifications.Add(await Update(notification));
            }
            return updatedNotifications;
        }

        public async Task<List<Notification>> FindNotificationsForProfile(int profileId)
        {
            Profile profile = await _profileService.GetByOriginalId(profileId);
            List<Notification> result = new List<Notification>();

            foreach(Notification notification in await GetAll())
            {
                if(notification.ReceiverId == notification.SenderId )
                {
                    continue;
                }

                if(notification.ReceiverId == profileId && !notification.Content.Contains("added") && !notification.Content.EndsWith("comment post."))
                {
                    result.Add(notification);
                } 

                
                if (profile.NotificationProfiles != null)
                {
                    foreach (ProfileNotificationProfile notificationProfile in profile.NotificationProfiles)
                    {
                        if (notificationProfile.NotificationProfileId == notification.SenderId && (notification.Content.Contains("added") || notification.Content.EndsWith("comment post.")))
                        {
                            result.Add(notification);
                        }
                    }
                }

            }

            /*if(result.Exists(notification => notification.Content.EndsWith("comment post.")) && result.Exists(notification => notification.Content.EndsWith("comment your post.")))
            {
                Notification notificationForRemove = result.Find(n => n.Content.EndsWith("comment post."));
                result.Remove(notificationForRemove);
            }*/

            return result;
        }

        public async Task<Notification> FindFollowRequestNotification(int receiverId, int senderId)
        {
            IEnumerable<Notification> notifications = await GetAll();
            Notification notification = notifications.Where(notification => notification.ReceiverId == receiverId && notification.SenderId == senderId && notification.FollowRequest == true).SingleOrDefault();
            return notification;
        }

        public async Task<Notification> GetById(int id)
        {
            return await _notificationRepository.GetById(id);
        }

        public async Task<IEnumerable<Notification>> GetAll()
        {
            return await _notificationRepository.GetAll();
        }

        public async Task<Notification> Insert(Notification entity)
        {
            return await _notificationRepository.Insert(entity);
        }

        public async Task<Notification> Update(Notification entity)
        {
            await _notificationRepository.Update(entity);
            return entity;
        }

        public async Task Delete(Notification entity)
        {
            await _notificationRepository.Delete(entity);
        }
    }
}
