using System.ComponentModel.DataAnnotations;

namespace ServerShowcase.Model
{
    public class CaptchaModel
    {
        [Required]
        [MinLength(1)]
        private string value;
        public string Value
        {
            get { return this.value.ToLower(); }
            set { this.value = value.ToLower();}
        }
    }
}
