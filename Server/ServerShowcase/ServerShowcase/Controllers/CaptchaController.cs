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
        private string[] _skills {  get; set; }
        private readonly ILogger<CaptchaController> _logger;
        public CaptchaController(ILogger<CaptchaController> logger)
        {
            _skills = ["java", "c#", "php", "sql", "scrum"];
            _logger = logger;
        }

        // POST: CaptchaController/Create
        [HttpPost]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult Post([FromBody] CaptchaModel captcha)
        {
            foreach(string skill in _skills)
            {
                if (captcha.Value.Equals(skill)){
                    _logger.LogInformation(" --- Captcha verified --- ");
                    return Ok(new { Status = "OK", Code = 204, Mesassage = "Captcha has been verified" });
                }
            }
            _logger.LogInformation(" --- Captcha not verified --- ");
            return BadRequest(ModelState);

        }
    }
}
