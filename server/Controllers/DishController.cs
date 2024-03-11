// DishController.cs
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

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

[ApiController]
[Route("api/[controller]")]
public class DishesController : ControllerBase {
    private readonly ApplicationDbContext _context;

    public DishesController(ApplicationDbContext context) {
        _context = context;
    }

    // GET: api/dishes
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Enitities.Dish>>> GetDishes(
        string sortBy = "rating",
        [FromQuery] string? dishTypes = null,
        [FromQuery] string? meatAvailability = null
    ) {
        IQueryable<Enitities.Dish> query = _context.Dishes;

        var dishTypesArr = Array.Empty<string>();
        var meatAvailabilityArr = Array.Empty<string>();
        if (dishTypes != null) {
            dishTypesArr = dishTypes.Split(",");
        }
        if (meatAvailability != null) {
            meatAvailabilityArr = meatAvailability.Split(",");
        }

        // Фильтрация по типам блюд
        if (dishTypesArr.Length != 0) {
            query = query.Where(d => dishTypesArr.Contains(d.Type));
        }
        // Фильтрация по наличию мяса
        if (meatAvailabilityArr.Length != 0) {
            query = query.Where(d => meatAvailabilityArr.Contains(d.MeatAvailability));
        }

        // Сортировка
        switch (sortBy.ToLower()) {
            case "price":
                query = query.OrderBy(d => d.Price);
                break;
            case "price-rev":
                query = query.OrderByDescending(d => d.Price);
                break;
            case "rating":
                query = query.OrderByDescending(d => d.Rating);
                break;
            default:
                return BadRequest("Некорректный параметр сортировки. Используйте 'price', 'price-rev' или 'rating'.");
        }

        return await query.ToListAsync();
    }

    // GET: api/Dishes/5
    [HttpGet("{id}")]
    public async Task<IActionResult> GetDish(int id) {
        var dish = await _context.Dishes.FindAsync(id);

        if (dish == null) {
            return NotFound();
        }

        return Ok(dish);
    }

    // POST: api/Dishes
    [HttpPost]
    public async Task<IActionResult> PostDish([FromBody] Enitities.Dish dish) {
        _context.Dishes.Add(dish);
        await _context.SaveChangesAsync();

        return CreatedAtAction("GetDish", new { id = dish.Id }, dish);
    }

    // DELETE: api/Dishes/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteDish(int id) {
        var dish = await _context.Dishes.FindAsync(id);

        if (dish == null) {
            return NotFound();
        }

        _context.Dishes.Remove(dish);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
