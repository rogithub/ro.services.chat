using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace Ro.Services.Chat.SignalRHubs
{
    public class ChatHub : Hub
    {
        public static class ConnectedUser
        {
            public static Dictionary<string, string> Ids = new Dictionary<string, string>();
        }

        public override Task OnDisconnectedAsync(Exception exception)
        {
            ConnectedUser.Ids.Remove(Context.ConnectionId);
            return base.OnDisconnectedAsync(exception);
        }

        public override Task OnConnectedAsync()
        {
            ConnectedUser.Ids.Add(Context.ConnectionId, "");
            return base.OnConnectedAsync();
        }

        public void SetUserName(string user)
        {
            ConnectedUser.Ids[this.Context.ConnectionId] = user;
        }

        public async Task SendMessage(string user, string message)
        {
            await Clients.Others.SendAsync("ReceiveMessage", user, message);
        }
    }
}
