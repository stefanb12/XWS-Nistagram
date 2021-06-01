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

        [HttpGet]
        public async Task<IActionResult> get()
        {
            return Ok(await _notificationService.GetAll());
        }

        [HttpPost("followRequest")]
        public async Task<IActionResult> SendFollowRequestNotification([FromBody] NotificationDto dto)
        {
            Notification notification = NotificationMapper.NotificationDtoToNotification(dto);
            notification.Content = dto.SenderId.ToString() + " wants to follow you";
            notification.FollowRequest = true;
            return Ok(await _notificationService.Insert(notification));
        }

        [HttpDelete("followRequest")]
        public async Task<IActionResult> DeleteFollowRequestNotification([FromBody] NotificationDto dto)
        {
            Notification notification = await _notificationService.FindNotification(dto.ReceiverId, dto.SenderId);
            await _notificationService.Delete(notification);
            return Ok();
        }
    }
}
