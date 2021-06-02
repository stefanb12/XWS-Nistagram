using Microsoft.AspNetCore.Mvc;
using NotificationMicroservice.Dto;
using NotificationMicroservice.Mapper;
using NotificationMicroservice.Model;
using NotificationMicroservice.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NotificationMicroservice.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotificationController : Controller
    {
        private readonly INotificationService _notificationService;

        public NotificationController(INotificationService notificationService)
        {
            _notificationService = notificationService;
        }

        [HttpGet("profile/{profileId}")]
        public async Task<IActionResult> GetNotificationsForProfile(int profileId)
        {
            List<Notification> notifications = await _notificationService.FindNotificationsForProfile(profileId);
            List<Notification> result = notifications.OrderByDescending(notification => notification.Time).ToList();
            if (!result.Any())
            {
                return NotFound();
            }
            return Ok(result);
        }

        [HttpPost("followRequest")]
        public async Task<IActionResult> SendFollowRequestNotification([FromBody] NotificationDto dto)
        {
            Notification notification = NotificationMapper.NotificationDtoToNotification(dto); 
            notification.Content = dto.SenderId.ToString() + " wants to follow you"; // Dobavi korisnikov username i sliku
            notification.FollowRequest = true;
            return Ok(await _notificationService.Insert(notification));
        }

        [HttpDelete("followRequest")]
        public async Task<IActionResult> DeleteFollowRequestNotification([FromBody] NotificationDto dto)
        {
            Notification notification = await _notificationService.FindFollowRequestNotification(dto.ReceiverId, dto.SenderId);
            await _notificationService.Delete(notification);
            return Ok();
        }

        [HttpPut("seen/{profileId}")]
        public async Task<IActionResult> UpdateSeenNotifications(int profileId)
        {
            List<Notification> notifications = await _notificationService.UpdateSeenNotifications(profileId);
            List<Notification> result = notifications.OrderByDescending(notification => notification.Time).ToList();
            if (!result.Any())
            {
                return NotFound();
            }
            return Ok(result);
        }
    }
}
