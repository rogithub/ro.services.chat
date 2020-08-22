using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Ro.Services.Chat.Models;
using System.Linq;

namespace Ro.Services.Chat.Controllers
{
    public class HomeController : Controller
    {
        private string[] FreeGroups { get; set; }
        private readonly ILogger<HomeController> _logger;

        private  ConnectedUsers Users { get; set; }

        public HomeController(
            ConnectedUsers users,
            ILogger<HomeController> logger,
            IConfiguration config)
        {
            Users = users;
            _logger = logger;
            FreeGroups = config.GetSection("App:Groups").Get<string[]>();
        }

        public IActionResult Index()
        {
            var counter = (from g in FreeGroups select string.Format("{0} ({1})", g, 
            Users.Ids.Count(u=>u.Value.Group == g)));
            return View(counter);            
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
