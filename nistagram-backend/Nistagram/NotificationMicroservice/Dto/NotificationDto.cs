﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NotificationMicroservice.Dto
{
    public class NotificationDto
    {
        public int Id { get; set; }
        public DateTime Time { get; set; }
        public string Content { get; set; }
        public bool Seen { get; set; }
        public bool FollowRequest { get; set; }
        public int ReceiverId { get; set; }
        public int SenderId { get; set; }
        public string PostId { get; set; }

        public NotificationDto() { }
    }
}
