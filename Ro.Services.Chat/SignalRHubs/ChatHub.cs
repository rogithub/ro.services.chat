using System;
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

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            var group = Connected.Ids[this.Context.ConnectionId].Group;

            await Groups.RemoveFromGroupAsync(Context.ConnectionId, group);
            Connected.Ids.Remove(Context.ConnectionId);

            await Clients.OthersInGroup(group).SendAsync("UsersListChange", Connected.GetUsers(group));

            await base.OnDisconnectedAsync(exception);
        }

        public override async Task OnConnectedAsync()
        {
            Connected.Ids.Add(Context.ConnectionId, null);
            await Clients.Caller.SendAsync("SetOwnId", Context.ConnectionId);
            await base.OnConnectedAsync();
        }

        public async Task SetInfo(UserInfo info)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, info.Group);
            Connected.Ids[this.Context.ConnectionId] = info;

            await Clients.OthersInGroup(info.Group).SendAsync("UsersListChange", Connected.GetUsers(info.Group));
        }

        public async Task SendMessage(UserInfo info, string message)
        {
            await Clients.OthersInGroup(info.Group).SendAsync("ReceiveMessage", info.Name, message);
        }
    }
}
