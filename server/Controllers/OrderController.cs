// OrderController.cs
using Microsoft.AspNetCore.Mvc;
using System;

[ApiController]
[Route("api/[controller]")]
public class OrderController : ControllerBase {
	// [HttpGet("{orderId}")]
	[HttpGet("{orderId}")]
	public IActionResult GetOrderById(string orderId) {
		// Здесь вы должны реализовать логику для получения данных заказа по его ID.
		// В этом примере возвращаются фиктивные данные.

		if (string.IsNullOrEmpty(orderId))
			return BadRequest("Order ID is required.");

		var order = new Order {
			OrderId = orderId,
			Status = "в исполнении",
			Address = "ул. Московская, д. 12",
			ExpectedDeliveryTime = DateTime.Now.AddHours(1) // Пример времени ожидаемой доставки
		};

		return Ok(order);
	}

	public class Order {
		public required string OrderId { get; set; }
		public required string Status { get; set; }
		public required string Address { get; set; }
		public DateTime ExpectedDeliveryTime { get; set; }
	}
}
