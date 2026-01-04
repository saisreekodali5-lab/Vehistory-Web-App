using Microsoft.AspNetCore.Mvc;
using Vehistory.Api.Data;
using Vehistory.Api.Models;

namespace Vehistory.Api.Controllers
{
    [ApiController]
    [Route("api/events")]
    public class CarEventsController : ControllerBase
    {
        private readonly VehistoryDbContext _context;

        public CarEventsController(VehistoryDbContext context)
        {
            _context = context;
        }

        // GET: api/events/{carId}
        [HttpGet("{carId}")]
        public IActionResult GetEvents(int carId)
        {
            var events = _context.CarEvents
                .Where(e => e.CarId == carId)
                .OrderByDescending(e => e.Date)
                .ToList();

            return Ok(events);
        }

        // POST: api/events
        [HttpPost]
        public IActionResult AddEvent(CarEvent carEvent)
        {
            // Check if car exists
            var car = _context.Cars.Find(carEvent.CarId);
            if (car == null)
            {
                return BadRequest($"Car with Id {carEvent.CarId} does not exist.");
            }

            _context.CarEvents.Add(carEvent);
            _context.SaveChanges();
            return Ok(carEvent);
        }

        // PUT: api/events/{id}
        [HttpPut("{id}")]
        public IActionResult UpdateEvent(int id, CarEvent updatedEvent)
        {
            var existing = _context.CarEvents.Find(id);
            if (existing == null) return NotFound();

            existing.Date = updatedEvent.Date;
            existing.Type = updatedEvent.Type;
            existing.Description = updatedEvent.Description;

            _context.SaveChanges();
            return Ok(existing);
        }

        // DELETE: api/events/{id}
        [HttpDelete("{id}")]
        public IActionResult DeleteEvent(int id)
        {
            var existing = _context.CarEvents.Find(id);
            if (existing == null) return NotFound();

            _context.CarEvents.Remove(existing);
            _context.SaveChanges();
            return NoContent();
        }

        // Optional: GET all warnings (for notifications)
        [HttpGet("warnings")]
        public IActionResult GetWarnings()
        {
            var warnings = _context.CarEvents
                .Where(e => e.Type == "Warning")
                .OrderByDescending(e => e.Date)
                .ToList();

            return Ok(warnings);
        }
    }
}
