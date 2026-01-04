using Microsoft.AspNetCore.Mvc;
using Vehistory.Api.Data;
using Vehistory.Api.Models;

namespace Vehistory.Api.Controllers
{
    [ApiController]
    [Route("api/notifications")]
    public class NotificationsController : ControllerBase
    {
        private readonly VehistoryDbContext _context;

        public NotificationsController(VehistoryDbContext context)
        {
            _context = context;
        }

        // Get latest 10 notifications (all types)
        [HttpGet]
        public IActionResult GetNotifications()
        {
            var notifications = _context.CarEvents
                .OrderByDescending(e => e.Date)
                .Take(10)
                .ToList();

            return Ok(notifications);
        }

        // Get only warnings
        [HttpGet("warnings")]
        public IActionResult GetWarnings()
        {
            var warnings = _context.CarEvents
                .Where(e => e.Type.ToLower() == "warning")
                .OrderByDescending(e => e.Date)
                .Take(10)
                .ToList();

            return Ok(warnings);
        }
    }
}
