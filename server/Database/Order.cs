using System.ComponentModel.DataAnnotations;

namespace Enitities {
	public class Order {
		[Key]
		public required string OrderId { get; set; }

		[Required]
		public required string Status { get; set; }

		[Required]
		public required string Address { get; set; }

		public DateTime ExpectedDeliveryTime { get; set; }
	}
}