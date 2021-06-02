﻿using NotificationMicroservice.Model;
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

        public NotificationService(INotificationRepository notificationRepository)
        {
            _notificationRepository = notificationRepository;
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
            IEnumerable<Notification> notifications = await GetAll();
            return notifications.ToList().Where(notification => notification.ReceiverId == profileId).ToList();
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