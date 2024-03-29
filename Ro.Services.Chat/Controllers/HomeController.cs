﻿using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Ro.Services.Chat.Models;
using System.Linq;
using Microsoft.AspNetCore.SignalR;
using Ro.Services.Chat.SignalRHubs;

namespace Ro.Services.Chat.Controllers
{
    public class HomeController : Controller
    {
        private string[] FreeGroups { get; set; }
        private readonly ILogger<HomeController> _logger;
        private ConnectedUsers ConnectedUsers { get; set; }
        private IHubContext<ChatHub> ChatHub { get; set; }
        public HomeController(
            IHubContext<ChatHub> chatHub,
            ConnectedUsers users,
            ILogger<HomeController> logger,
            IConfiguration config)
        {
            this.ChatHub = chatHub;
            ConnectedUsers = users;
            _logger = logger;
            FreeGroups = config.GetSection("App:Groups").Get<string[]>();
        }

        public IActionResult Index()
        {
            var groups = (from g in FreeGroups
                          select new GroupInfo
                          {
                              Name = g,
                              Count = ConnectedUsers.Ids.Count(u => u.Value.Group == g)
                          }
            );
            return View(groups);
        }

        public IActionResult Chat()
        {
            return View();
        }

        public IActionResult GetUsers(string groupName)
        {
            return Json(ConnectedUsers.GetUsers(groupName));
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
