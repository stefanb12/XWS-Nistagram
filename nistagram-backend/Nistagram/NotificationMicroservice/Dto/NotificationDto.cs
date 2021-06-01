using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NotificationMicroservice.Dto
{
    public class NotificationDto
    {
        public int ReceiverId { get; set; }
        public int SenderId { get; set; }
        public int PostId { get; set; }

        public NotificationDto() { }
    }
}
