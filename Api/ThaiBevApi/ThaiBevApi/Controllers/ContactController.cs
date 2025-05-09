using Microsoft.AspNetCore.Mvc;
using ThaiBevApi.Models;
using ThaiBevApi.Models.Schema;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ThaiBevApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactController(ILogger<ContactController> logger, AppDbContext context) : ControllerBase
    {
        private readonly ILogger<ContactController> _logger = logger;
        private readonly AppDbContext _context = context;
        [HttpGet]
        public string Get()
        {
            return "test";
        }

        [HttpGet("{id}")]
        public Contact? Get(Guid id)
        {
            return _context.Contacts.FirstOrDefault(e => e.Id == id);
        }

        [HttpPost]
        public IActionResult AddContact(ContactData value)
        {
            if (ModelState.IsValid && value.Profile.ContentType.StartsWith("image"))
            {
                var row = new Contact()
                {
                    Firstname = value.FirstName,
                    Lastname = value.LastName,
                    Email = value.Email,
                    Phone = value.Phone,
                    Birthday = value.BirthDay ,
                    Occupation = value.Occupation,
                    Sex = value.Sex,
                    ProfileType = value.Profile?.ContentType,
                    ProfileContent = value.Profile?.Length > 0 ? ConvertToBase64(value.Profile) : null
                };
                _context.Contacts.Add(row);
                _context.SaveChanges();
                return new OkObjectResult(new { success = true, id = row.Id.ToString() });
            }
            return BadRequest(new { success = false, message = "Invalid data!" });
        }

        [HttpPut("{id}")]
        public IActionResult Put(Guid id, [FromBody] ContactData value)
        {
            if (ModelState.IsValid && value.Profile.ContentType.StartsWith("image"))
            {
                var row = _context.Contacts.FirstOrDefault(e => e.Id == id);
                if(row != null)
                {
                    row.Firstname = value.FirstName;
                    row.Lastname = value.LastName;
                    row.Email = value.Email;
                    row.Phone = value.Phone;
                    row.Birthday = value.BirthDay;
                    row.Occupation = value.Occupation;
                    row.Sex = value.Sex;
                    row.ProfileType = value.Profile?.ContentType;
                    row.ProfileContent = value.Profile?.Length > 0 ? ConvertToBase64(value.Profile) : null;
                    _context.SaveChanges();
                    return new OkObjectResult(new { success = true, id = row.Id.ToString() });
                }
            }
            return BadRequest(new { success = false, message = "Invalid data or Not has row id!" });
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(Guid id)
        {
            var row = _context.Contacts.FirstOrDefault(e => e.Id == id);
            if (row != null)
            {
                _context.Contacts.Remove(row);
                _context.SaveChanges();
                return Ok();
            }
            return BadRequest(new { success = false, message = "Not has row id!" });
        }

        private string ConvertToBase64(IFormFile file)
        {
            using (var memoryStream = new MemoryStream())
            {
                file.CopyTo(memoryStream);
                var fileBytes = memoryStream.ToArray();
                return Convert.ToBase64String(fileBytes);
            }
        }
        [HttpGet("GetProfile/{id}")]
        public IActionResult GetProfile(Guid id)
        {
            var contact = _context.Contacts.FirstOrDefault(c => c.Id == id);
            if (contact == null || contact.ProfileContent == null || contact.ProfileType == null)
                return NotFound();
            var fileBytes = Convert.FromBase64String(contact.ProfileContent);
            return File(fileBytes, contact.ProfileType);
        }
    }
}
