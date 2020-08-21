using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace Ro.Services.Chat.SignalRHubs
{
    public class ChatHub : Hub
    {
        public async Task SendMessage(string user, string message)
        {
            await Clients.Others.SendAsync("ReceiveMessage", user, message);
        }
    }
}
