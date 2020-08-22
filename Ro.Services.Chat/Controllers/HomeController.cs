using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Ro.Services.Chat.Models;

namespace Ro.Services.Chat.Controllers
{
    public class HomeController : Controller
    {
        private string[] FreeGroups { get; set; }
        private readonly ILogger<HomeController> _logger;

        public HomeController(
            ILogger<HomeController> logger,
            IConfiguration config)
        {
            _logger = logger;
            FreeGroups = config.GetSection("App:Groups").Get<string[]>();
        }

        public IActionResult Index()
        {
            return View(FreeGroups);
        }

        public IActionResult Chat()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
