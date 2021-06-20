using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace UserMicroservice.Email
{
    public class EmailSender : IEmailSender
    {
        public void SendRegistrationRequestAcceptanceEmail(string recipientEmailAddress, string username)
        {
            MailAddress senderAddress = new MailAddress("pswfirma8@gmail.com");
            MailAddress recipientAddress = new MailAddress("pswfirma8@gmail.com");
            SmtpClient smtp = CreateSmtpClient(senderAddress, "8firmapsw");
            MailMessage message = CreateMailMessage(senderAddress, recipientAddress, username);
            message.IsBodyHtml = true;
            smtp.Send(message);
        }

        private SmtpClient CreateSmtpClient(MailAddress senderEmailAddress, string senderPassword)
        {
            return new SmtpClient
            {
                Host = "smtp.gmail.com",
                Port = 587,
                EnableSsl = true,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential(senderEmailAddress.Address, senderPassword)
            };
        }

        private MailMessage CreateMailMessage(MailAddress senderEmailAddress, MailAddress recipientEmailAddress, string username)
        {
            return new MailMessage(senderEmailAddress, recipientEmailAddress)
            {
                Subject = "Agent registration request acceptance notification",
                Body = File.ReadAllText("wwwroot\\html\\registrationRequestEmail.html").Replace("#username#", username)
            };
        }
    }
}
