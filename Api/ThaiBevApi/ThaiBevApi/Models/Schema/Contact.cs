namespace ThaiBevApi.Models.Schema;

public partial class Contact
{
    public Guid Id { get; set; }

    public string? Firstname { get; set; }

    public string? Lastname { get; set; }

    public string? Sex { get; set; }

    public string? Email { get; set; }

    public string? Phone { get; set; }

    public DateTime? Birthday { get; set; }

    public string? Occupation { get; set; }

    public string? ProfileContent { get; set; }

    public string? ProfileType { get; set; }
}
