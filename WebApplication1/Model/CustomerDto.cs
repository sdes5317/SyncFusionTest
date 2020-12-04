namespace WebApplication1.Model
{
    public class CustomerDto
    {
        public string CustomerId { get; set; }
        public string Name { get; set; }
        public string Country { get; set; }
        public string State { get; set; }
        public string Zip { get; set; }
        public string City { get; set; }
        public string Address { get; set; }
        public CustomerDto()
        {
            CustomerId = string.Empty;
            Name = string.Empty;
            Country = string.Empty;
            State = string.Empty;
            Zip = string.Empty;
            City = string.Empty;
            Address = string.Empty;
        }
    }
}