// DishController.cs
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/Dish")]
public class DishController : ControllerBase {
    private readonly ApplicationDbContext _context; // Ваш контекст базы данных

    public DishController(ApplicationDbContext context) {
        _context = context;
    }

    [HttpGet("search")]
    public IActionResult SearchDishes(string query) {
        if (string.IsNullOrEmpty(query))
            return BadRequest("Query is required.");

        query = query.ToLower();

        // Выполняем запрос к базе данных для поиска совпадений в названиях блюд
        var matchingDishes = _context.Dishes
            .Where(d => EF.Functions.Like(d.Name.ToLower(), $"{query}%")) // Используем EF.Functions.Like для сравнения начала строки
            .Select(d => d.Name)
            .ToList();

        return Ok(matchingDishes);
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
