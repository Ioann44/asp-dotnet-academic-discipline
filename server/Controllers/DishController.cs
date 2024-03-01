// DishController.cs
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

[ApiController]
[Route("api/[controller]")]
public class DishController : ControllerBase {
    // Пример данных (вместо этого данные могут быть загружены из базы данных)
    private static readonly List<Dish> dishes =
    [
        new Dish { Name = "Борщ", Price = 250 },
        new Dish { Name = "Пельмени с мясом", Price = 180 },
        new Dish { Name = "Цезарь-салат", Price = 320 },
        new Dish { Name = "Пицца 'Маргарита'", Price = 400 },
        new Dish { Name = "Суши ролл 'Филадельфия'", Price = 550 },
        new Dish { Name = "Стейк из говядины", Price = 700 },
        new Dish { Name = "Лобстер с маслом", Price = 1200 },
        new Dish { Name = "Тирамису", Price = 220 },
        new Dish { Name = "Фруктовый коктейль", Price = 150 },
        // Добавьте другие блюда
    ];

    [HttpGet]
    public IActionResult GetDishes() {
        return Ok(dishes);
    }

    [HttpGet("search")]
    public IActionResult SearchDishes(string query) {
        if (string.IsNullOrEmpty(query))
            return BadRequest("Query is required.");

        var matchingDishes = dishes
            .Where(d => d.Name.ToLower().StartsWith(query.ToLower()))
            .Select(d => d.Name)
            .ToList();

        return Ok(matchingDishes);
    }

    public class Dish {
        public required string Name { get; set; }
        public int Price { get; set; }
    }
}
