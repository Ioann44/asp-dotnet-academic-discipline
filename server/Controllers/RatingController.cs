// RatingController.cs
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class RatingController : ControllerBase {
	private static readonly Dictionary<string, List<int>> DishRatings = [];

	[HttpPost]
	public IActionResult AddRating([FromBody] RatingData ratingData) {
		if (string.IsNullOrEmpty(ratingData.DishId) || !IsValidRating(ratingData.Rating)) {
			return BadRequest("Invalid rating data.");
		}

		if (!DishRatings.ContainsKey(ratingData.DishId)) {
			DishRatings[ratingData.DishId] = [];
		}

		DishRatings[ratingData.DishId].Add(ratingData.Rating);

		var averageRating = CalculateAverageRating(DishRatings[ratingData.DishId]);
		return Ok(new { averageRating });
	}

	private bool IsValidRating(int rating) {
		return rating >= 1 && rating <= 10;
	}

	private double CalculateAverageRating(List<int> ratings) {
		if (ratings.Count == 0) {
			return 0;
		}

		return ratings.Average();
	}

	public class RatingData {
		public required string DishId { get; set; }
		public int Rating { get; set; }
	}
}
