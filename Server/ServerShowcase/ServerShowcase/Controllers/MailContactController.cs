using MailKit.Net.Smtp;
using Microsoft.AspNetCore.Mvc;
using MimeKit;
using ServerShowcase.Model;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ServerShowcase.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MailContactController : ControllerBase
    {
        // POST api/<MailContactController>
        [HttpPost]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        [ProducesResponseType(500)]
        public IActionResult Post([FromBody] MailContactModel mailContact)
        {
            if (mailContact == null) return BadRequest(ModelState);        
            if (!ModelState.IsValid) return BadRequest(ModelState);

            return SendMail(mailContact);
        }
        doe cors 
        private IActionResult SendMail(MailContactModel mailContact)
        {
            MimeMessage mail = new MimeMessage();
            SmtpClient smtp = new SmtpClient();
            try
            {
                mail.From.Add(new MailboxAddress("CVTeun", "no-reply@teunvanderkleij.nl"));
                mail.To.Add(new MailboxAddress("Teun van der Kleij", "teunvanderkleij@gmail.com"));

                mail.Subject = mailContact.Subject;
                var builder = new BodyBuilder()
                {
                    TextBody = mailContact.FirstName.ToString()
                };
                mail.Body = builder.ToMessageBody();

                smtp.Connect("sandbox.smtp.mailtrap.io", 587, false);
                smtp.Authenticate("41c03090d6fc4a", "6b4c38a857874c");
                smtp.Send(mail);
                smtp.Disconnect(true);

                return Ok(new { Status = "OK", Code = 204, Message = "Email has been deliverd" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Status = "Error", Code = 500, Message = "Email has not been deliverd. Exception message: " + ex.Message});
            }
            finally{
                smtp.Dispose();
            }
        }
        
    }
}
