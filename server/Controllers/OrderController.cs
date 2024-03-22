using Microsoft.AspNetCore.Mvc;

namespace YourProject.Controllers {
    [ApiController]
    [Route("api/[controller]")]
    public class OrderController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public OrderController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("{orderId}")]
        public IActionResult GetOrderById(string orderId)
        {
            if (string.IsNullOrEmpty(orderId))
                return BadRequest("Order ID is required.");

            // Получаем заказ из базы данных по его ID
            var order = _context.Orders.Find(orderId);

            if (order == null)
                return NotFound("Order not found.");

            return Ok(order);
        }
    }
}
