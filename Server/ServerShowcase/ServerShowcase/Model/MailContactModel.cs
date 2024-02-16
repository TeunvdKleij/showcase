using System.ComponentModel.DataAnnotations;

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
        public required string PhoneNumber { get; set; }
        [Required]
        [EmailAddress]
        [MinLength(1)]
        [MaxLength(80)]
        public required string Email { get; set; }
        [Required]
        [MinLength(1)]
        [MaxLength(200)]
        public required string Subject { get; set; }
        [Required]
        [MinLength(1)]
        [MaxLength(600)]
        public required string Message { get; set; }

    }
}
