using System.ComponentModel.DataAnnotations;

namespace ServerShowcase.Model
{
    public class CaptchaModel
    {
        [Required]
        [MinLength(1)]
        public string Value { get; set; }
    }
}
