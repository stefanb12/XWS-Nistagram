﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace UserMicroservice.Messaging
{
    public interface IMessageReceiver
    {
        public void ReceiveMessage();
    }
}
