﻿using Microsoft.AspNetCore.Mvc;
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
        private readonly IProfileService _profileService;
        private readonly IPostService _postService;

        public NotificationController(INotificationService notificationService, IProfileService profileService, IPostService postService)
        {
            _notificationService = notificationService;
            _profileService = profileService;
            _postService = postService;
        }

        [HttpGet("profile/{profileId}")]
        public async Task<IActionResult> GetNotificationsForProfile(int profileId)
        {
            List<Notification> notifications = await _notificationService.FindNotificationsForProfile(profileId);

            foreach (Notification notification in notifications)
            {
                notification.Sender.ImageSrc = String.Format("http://localhost:55988/{0}", notification.Sender.ImageName);
                notification.Post.ImageSrc = String.Format("http://localhost:55993/{0}", notification.Post.ImageName);
            }

            List<Notification> result = notifications.OrderByDescending(notification => notification.Time).ToList();

            if (!result.Any())
            {
                return NotFound();
            }

            return Ok(result);
        }

        [HttpPost("like")]
        public async Task<IActionResult> SendLikeNotification([FromBody] NotificationDto dto)
        {
            if (dto.SenderId == dto.ReceiverId)
            {
                return Ok();
            }
            Post post = null;
            if (!dto.PostId.Equals(""))
            {
                post = await _postService.GetByOriginalId(dto.PostId);
            }
            Notification notification = NotificationMapper.NotificationDtoToNotification(dto, post);
            Profile sender = await _profileService.GetById(dto.SenderId);
            notification.Content = sender.Username + " like your post.";
            return Ok(await _notificationService.Insert(notification));
        }

        [HttpPost("dislike")]
        public async Task<IActionResult> SendDislikeNotification([FromBody] NotificationDto dto)
        {
            if(dto.SenderId == dto.ReceiverId)
            {
                return Ok();
            }
            Post post = null;
            if (!dto.PostId.Equals(""))
            {
                post = await _postService.GetByOriginalId(dto.PostId);
            }
            Notification notification = NotificationMapper.NotificationDtoToNotification(dto, post);
            Profile sender = await _profileService.GetById(dto.SenderId);
            notification.Content = sender.Username + " dislike your post.";
            return Ok(await _notificationService.Insert(notification));
        }

        [HttpPost("comment")]
        public async Task<IActionResult> SendCommentNotification([FromBody] NotificationDto dto)
        {
            if (dto.SenderId == dto.ReceiverId)
            {
                return Ok();
            }
            Post post = null;
            if (!dto.PostId.Equals(""))
            {
                post = await _postService.GetByOriginalId(dto.PostId);
            }  
            Notification notification = NotificationMapper.NotificationDtoToNotification(dto, post);
            Profile sender = await _profileService.GetById(dto.SenderId);
            notification.Content = sender.Username + " comment your post.";
            return Ok(await _notificationService.Insert(notification));
        }

        [HttpPost("follow")]
        public async Task<IActionResult> SendFollowNotification([FromBody] NotificationDto dto)
        {
            Notification notification = NotificationMapper.NotificationDtoToNotification(dto, null);
            Profile sender = await _profileService.GetById(dto.SenderId);
            notification.Content = sender.Username + " started following you.";
            return Ok(await _notificationService.Insert(notification));
        }

        [HttpPost("followRequest")]
        public async Task<IActionResult> SendFollowRequestNotification([FromBody] NotificationDto dto)
        {
            Notification notification = NotificationMapper.NotificationDtoToNotification(dto, null);
            Profile sender = await _profileService.GetById(dto.SenderId);
            notification.Content = sender.Username + " wants to follow you.";
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
