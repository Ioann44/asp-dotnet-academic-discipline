// Пример ApiController
using Microsoft.AspNetCore.Mvc;

namespace MyServer.Controllers.Api
{
    [Route("api/")]
    [ApiController]
    public class ApiController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            return Ok("Hello from API!");
        }

        // Добавьте здесь другие методы API
    }
}
