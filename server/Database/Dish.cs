using System.ComponentModel.DataAnnotations;

namespace Enitities {
	public class Dish {
		[Key]
		public int Id { get; set; }

		public required string Name { get; set; }
		public required string Description { get; set; }
		public required string Ingredients { get; set; }
		public decimal Rating { get; set; }
		public int RatingCount { get; set; }
		public int Price { get; set; }
		public required string Type { get; set; }
		public required string MeatAvailability { get; set; }
		// public required byte[] Image1 { get; set; }
		public byte[]? Image1 { get; set; }
		public byte[]? Image2 { get; set; }
		public byte[]? Image3 { get; set; }
	}
}