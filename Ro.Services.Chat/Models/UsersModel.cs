using System.Linq;
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

    public class ChatUser
    {
        public string Id { get; set; }
        public string Name { get; set; }
    }

    public class ConnectedUsers
    {
        public Dictionary<string, UserInfo> Ids = new Dictionary<string, UserInfo>();

        public IEnumerable<ChatUser> GetUsers(string groupName)
        {
            return (from u in this.Ids
                    where u.Value.Group == groupName
                    select new ChatUser
                    {
                        Id = u.Key,
                        Name = u.Value.Name
                    });
        }
    }

}
