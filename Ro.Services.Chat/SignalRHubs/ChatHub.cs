
using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace Ro.Services.Chat.SignalRHubs
{
    public class ChatHub : Hub
    {
        public string GetConnectionId()
        {
            return Context.ConnectionId;
        }

        public override async Task OnConnectedAsync()
        {
            await base.OnConnectedAsync();
            await Clients.Others.SendAsync("Communicator.OnConnected", Context.ConnectionId);
        }

        public override async Task OnDisconnectedAsync(Exception ex)
        {
            await base.OnDisconnectedAsync(ex);
            await Clients.Others.SendAsync("Communicator.OnDisconnected", Context.ConnectionId);
        }

        public async Task<Guid> SendBinaryTo(string eventName, string[] to, string metaData, byte[] data)
        {
            Console.WriteLine($"BINARY event: {eventName}, to length: {to.Length}");
            Task task = (to == null || to.Length == 0) ?
            Clients.Others.SendAsync(eventName, metaData, data) :
            Clients.Clients(to).SendAsync(eventName, metaData, data);

            await task;
            return Guid.NewGuid();
        }


        public async Task<Guid> SendStringTo(string eventName, string[] to, string metaData, string data)
        {
            Console.WriteLine($"STRING event: {eventName}, to length: {to.Length}");
            Task task = (to == null || to.Length == 0) ?
            Clients.Others.SendAsync(eventName, metaData, data) :
            Clients.Clients(to).SendAsync(eventName, metaData, data);

            await task;
            return Guid.NewGuid();
        }

        public async Task SendMessage(string user, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }
    }
}
