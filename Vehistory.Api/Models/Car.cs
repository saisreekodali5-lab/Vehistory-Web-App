using System.Text.Json.Serialization;

namespace Vehistory.Api.Models
{
    public class Car
    {
        public int Id { get; set; }
        public string Brand { get; set; } = "";
        public string Model { get; set; } = "";
        public int Year { get; set; }

        [JsonIgnore]
        public List<CarEvent> Events { get; set; } = new();
    }
}
