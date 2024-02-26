using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Org.BouncyCastle.Asn1;
using ServerShowcase.Model;

namespace ServerShowcase.Controllers
{
    [Route ("/api/[controller]")]
    [ApiController]
    public class CaptchaController : ControllerBase
    {
        private static string[] _skills = ["java", "c#", "php", "sql", "scrum"];
        private readonly ILogger<CaptchaController> _logger;
        public CaptchaController(ILogger<CaptchaController> logger)
        {
            _logger = logger;
        }

        // POST: CaptchaController/Create
        [HttpPost]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult Post([FromBody] CaptchaModel captcha)
        {
            if (CheckCaptcha(captcha.Value))
            {
                _logger.LogInformation(" --- Captcha verified --- ");
                return Ok(new { Status = "OK", Code = 204, Mesassage = "Captcha has been verified" });
            }
            _logger.LogInformation(" --- Captcha not verified --- ");
            return BadRequest(ModelState);
        }
        public static bool CheckCaptcha(string captchaValue) {
            captchaValue = captchaValue.ToLower();
            foreach (string skill in _skills)
            {
                if (captchaValue.Equals(skill)) return true;
            }
            return false;
        }
    }
}
