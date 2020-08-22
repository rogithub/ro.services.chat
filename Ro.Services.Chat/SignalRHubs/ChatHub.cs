using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using Ro.Services.Chat.Models;

namespace Ro.Services.Chat.SignalRHubs
{
    public class ChatHub : Hub
    {
        private ConnectedUsers Connected { get; set; }
        public ChatHub(ConnectedUsers users)
        {
            this.Connected = users;
        }

        public override Task OnDisconnectedAsync(Exception exception)
        {
            Groups.RemoveFromGroupAsync(Context.ConnectionId, Connected.Ids[this.Context.ConnectionId].Group);
            Connected.Ids.Remove(Context.ConnectionId);
            return base.OnDisconnectedAsync(exception);
        }

        public override Task OnConnectedAsync()
        {
            Connected.Ids.Add(Context.ConnectionId, null);
            return base.OnConnectedAsync();
        }

        public async Task SetInfo(UserInfo info)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, info.Group);
            Connected.Ids[this.Context.ConnectionId] = info;
        }

        public async Task SendMessage(UserInfo info, string message)
        {
            await Clients.OthersInGroup(info.Group).SendAsync("ReceiveMessage", info.Name, message);
        }
    }
}
