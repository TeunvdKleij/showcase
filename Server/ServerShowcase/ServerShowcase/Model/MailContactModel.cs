using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;
using System.Web;

namespace ServerShowcase.Model
{
    public class MailContactModel
    {
        [Required]
        [MinLength(1)]
        [MaxLength(60)]
        public required string FirstName { get; set; }
        [Required]
        [MinLength(1)]
        [MaxLength(60)]
        public required string LastName { get; set; }
        [Required]
        [Phone]
        [MinLength(1)]
        [MaxLength(20)]
        [RegularExpression(@"^((\+[0-9]{2}|0)[0-9]{9,20})|(([0][0-9]{1}-)[0-9]{8,20})$")]
        public required string PhoneNumber { get; set; }
        [Required]
        [EmailAddress]
        [MinLength(1)]
        [MaxLength(80)]
        [RegularExpression(@"^\S+@\S+\.\S{2,}$")]
        public required string Email { get; set; }
        [Required]
        [MinLength(1)]
        [MaxLength(200)]
        public required string Subject { get; set; }
        [Required]
        [MinLength(1)]
        [MaxLength(600)]
        public required string Message { get; set; }

        [Required]
        [MinLength(1)]
        public required string CaptchaResponse { get; set; }

        public void SanitizeHTML()
        {
            FirstName = SanitizeHTML(FirstName);
            LastName = SanitizeHTML(LastName);
            Subject = SanitizeHTML(Subject);
            Message = SanitizeHTML(Message);
        }
        private string SanitizeHTML(string HTMLContent)
        {
            string sanitizedHTML = HTMLContent;
            if (!string.IsNullOrEmpty(HTMLContent))
            {
                string[] allowedTags = { "b", "i", "u", "strong", "em", "ul", "ol", "li", "a", "br", "hr", "h1", "h2", "h3", "h4", "h5", "h6", "p" };
                string regex = $@"<(?!\/?(?:{string.Join("|", allowedTags)})(\s|\/|$)).*?>";
                sanitizedHTML = Regex.Replace(HTMLContent, regex, string.Empty);
                sanitizedHTML = HttpUtility.HtmlDecode(sanitizedHTML);
            }
            return sanitizedHTML;
        }

    }
}
