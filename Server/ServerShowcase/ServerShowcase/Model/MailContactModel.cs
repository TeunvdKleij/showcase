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

        public void SanitizeHTML()
        {
            FirstName = SanitizeHTML(FirstName);
            LastName = SanitizeHTML(LastName);
            Subject = SanitizeHTML(Subject);
            Message = SanitizeHTML(Message);
        }
        private string SanitizeHTML(string inputValue)
        {
            string sanitizedText = inputValue;
            if (!string.IsNullOrEmpty(inputValue))
            {
                string regex = $@"insert|select|delete|update|<script>|<\/script>|type\s?=\s?""hidden""";
                sanitizedText = Regex.Replace(inputValue, regex, string.Empty, RegexOptions.IgnoreCase);
            }
            return sanitizedText;
        }

    }
}
