namespace ThaiBevApi.Models
{
    public class ContactData
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public IFormFile Profile { get; set; }
        public DateTime? BirthDay { get; set; }
        public string Occupation { get; set; }
        public string Sex { get; set; }
    }
}
