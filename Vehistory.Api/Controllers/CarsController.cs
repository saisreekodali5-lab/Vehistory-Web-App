using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Vehistory.Api.Data;
using Vehistory.Api.Models;

namespace Vehistory.Api.Controllers
{
    [ApiController]
    [Route("api/cars")]
    public class CarsController : ControllerBase
    {
        private readonly VehistoryDbContext _context;

        public CarsController(VehistoryDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetCars()
        {
            return Ok(_context.Cars.Include(c => c.Events).ToList());
        }

        [HttpPost]
        public IActionResult AddCar(Car car)
        {
            _context.Cars.Add(car);
            _context.SaveChanges();
            return Ok(car);
        }

        // ✅ DELETE car and its events
        [HttpDelete("{id}")]
        public IActionResult DeleteCar(int id)
        {
            var car = _context.Cars
                .Include(c => c.Events)
                .FirstOrDefault(c => c.Id == id);

            if (car == null) return NotFound();

            _context.Cars.Remove(car);
            _context.SaveChanges();

            return NoContent();
        }
    }
}
