using System;
using System.Text.Json.Serialization;

namespace Vehistory.Api.Models
{
    public class CarEvent
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public string Type { get; set; } = "";
        public string Description { get; set; } = "";

        public int CarId { get; set; }

        [JsonIgnore]
        public Car? Car { get; set; }
    }
}
