using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Threading.Tasks;

namespace UserMicroservice.Email
{
    public interface IEmailSender
    {
        public void SendRegistrationRequestAcceptanceEmail(string recipientEmailAddress, string username);
    }
}
