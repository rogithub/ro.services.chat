using System;
using System.Collections.Generic;

namespace Ro.Services.Chat.Models
{
    public class GroupInfo
    {
        public string Name { get; set; }
        public int Count { get; set; }
    }
    public class UserInfo
    {
        public string Name { get; set; }
        public string Group { get; set; }
    }
    public class ConnectedUsers
    {
        public Dictionary<string, UserInfo> Ids = new Dictionary<string, UserInfo>();
    }

}
