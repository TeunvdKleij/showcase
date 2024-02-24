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
        private readonly ILogger<MailContactController> _logger;

        public MailContactController(ILogger<MailContactController> logger)
        {
            _logger = logger;
        }

        // POST api/MailContactController>
        [HttpPost]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        [ProducesResponseType(500)]
        public IActionResult Post([FromBody] MailContactModel mailContact)
        {
            CaptchaController.ValidateCaptcha(mailContact.CaptchaResponse);
            _logger.LogInformation(" --- PostRequest received --- ");
            if (mailContact == null)
            {
                _logger.LogInformation(" --- Empty MailcontactModel --- ");
                return BadRequest(ModelState);
            }
            if (!ModelState.IsValid)
            {
                _logger.LogInformation(" --- ModelSate not valid --- ");
                return BadRequest(ModelState);
            }
            if (CaptchaController.ValidateCaptcha(mailContact.CaptchaResponse) == "false")
            {
                _logger.LogInformation(" --- No Valid Captcha --- ");
                return BadRequest(ModelState);
            }

            return SendMail(mailContact);
        }
        private IActionResult SendMail(MailContactModel mailContact)
        {
            MimeMessage mail = new MimeMessage();
            SmtpClient smtp = new SmtpClient();
            _logger.LogInformation(" --- Sending mail --- ");
            try
            {
                mailContact.SanitizeHTML();
                mail.From.Add(new MailboxAddress(mailContact.FirstName + " " + mailContact.LastName, mailContact.Email.ToString()));
                mail.To.Add(new MailboxAddress("Teun van der Kleij", "teunvanderkleij@gmail.com"));

                mail.Subject = mailContact.Subject;
                var builder = new BodyBuilder()
                {
                   TextBody = "Phone number: " + mailContact.PhoneNumber + "\n" + "Message: \n" + mailContact.Message
                   /* HtmlBody = "<!doctype html>\r\n<html xmlns=\"http://www.w3.org/1999/xhtml\" xmlns:v=\"urn:schemas-microsoft-com:vml\" xmlns:o=\"urn:schemas-microsoft-com:office:office\">"
                    +"<head>\r\n<title>"+mailContact.Subject+"</title>\r\n<meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\" />\r\n<meta name=\"viewport\" content=\"width=device-width\" />\r\n<style>\r\n<!--- CSS will be here --->\r\n</style>\r\n</head>"
                    +""*/

                };
                mail.Body = builder.ToMessageBody();

                smtp.Connect("sandbox.smtp.mailtrap.io", 587, false);
                smtp.Authenticate("41c03090d6fc4a", "6b4c38a857874c");
                smtp.Send(mail);
                _logger.LogInformation(" --- Mail has been send --- ");
                smtp.Disconnect(true);

                return Ok(new { Status = "OK", Code = 204, Message = "Email has been deliverd" });
            }
            catch (Exception ex)
            {
                _logger.LogInformation(" --- Mail not send --- ");
                return StatusCode(500, new { Status = "Error", Code = 500, Message = "Email has not been deliverd. Exception message: " + ex.Message});
            }
            finally{
                smtp.Dispose();
            }
        }

    }
}
