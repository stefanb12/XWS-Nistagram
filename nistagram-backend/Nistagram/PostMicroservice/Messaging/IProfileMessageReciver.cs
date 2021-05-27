using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PostMicroservice.Messaging
{
    public interface IProfileMessageReciver
    {
        public void ReceiveMessage();
    }
}
