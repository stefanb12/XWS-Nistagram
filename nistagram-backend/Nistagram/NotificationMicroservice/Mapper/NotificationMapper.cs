using NotificationMicroservice.Dto;
using NotificationMicroservice.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NotificationMicroservice.Mapper
{
    public class NotificationMapper
    {
        public static Notification NotificationDtoToNotification(NotificationDto dto)
        {
            Notification notification = new Notification();
            notification.Time = DateTime.Now;
            notification.Content = "";
            notification.Seen = false;
            notification.FollowRequest = false;
            notification.ReceiverId = dto.ReceiverId;
            notification.SenderId = dto.SenderId;
            notification.PostId = 1;
            if(dto.PostId != 0)
            {
                notification.PostId = dto.PostId;
            } 

            return notification;
        }

        public static NotificationDto NotificationToNotificationDto(Notification notification)
        {
            NotificationDto dto = new NotificationDto();
            return dto;
        }
    }
}
