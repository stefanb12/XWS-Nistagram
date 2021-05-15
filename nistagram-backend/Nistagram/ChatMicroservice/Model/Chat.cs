﻿using System.Collections.Generic;

namespace ChatMicroservice.Model
{
    public class Chat
    {
        public long Id { get; set; }
        public List<Message> Messages;
        public Profile FirstProfile;
        public Profile SecondProfile;

        public Chat()
        {
        }
    }
}
