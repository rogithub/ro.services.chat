import { UserInfo } from '../models/userInfo';
import { ChatUser } from '../models/chatUser';
import { ChatConnection } from './chatConnection';
import { ChatStateUser } from './chatStateUser';
import { MessageInfo } from './messageInfo';
import { Status } from './status';
import { StateMessage } from './stateMessage';
import { Message } from './message';

export class ChatTemplates {

    public message: KnockoutObservable<string>;
    public id: KnockoutObservable<string>;
    public chattingWith: KnockoutObservable<ChatStateUser>;
    public isPublic: KnockoutComputed<boolean>;
    public hasUnread: KnockoutComputed<boolean>;

    public $: JQueryStatic;
    public ko: KnockoutStatic;
    public user: UserInfo;
    public urlSignalr: string;
    public chatConnection: ChatConnection;
    public messages: KnockoutObservableArray<MessageInfo<any>>;
    public users: KnockoutObservableArray<ChatStateUser>;
    public usersFilter: KnockoutObservable<string>;
    public filteredUsers: KnockoutComputed<ChatStateUser[]>;    

    constructor(ko: KnockoutStatic, $: JQueryStatic, user: UserInfo, urlSignalr: string) {
        this.ko = ko;
        this.$ = $;
        this.user = user;
        this.urlSignalr = urlSignalr;
        this.message = ko.observable<string>("");
        this.id = ko.observable<string>("");
        this.usersFilter = ko.observable<string>("");
        this.chattingWith = ko.observable<ChatStateUser>();
        this.messages = ko.observableArray<MessageInfo<any>>([]);
        this.users = ko.observableArray<ChatStateUser>([]);        
        $("#txtMsg").focus();
        const self = this;
        this.chatConnection = new ChatConnection(
            user, urlSignalr,
            self.onMessage,
            self.onPrivateMessage,
            self.onReceiveMessageDelivered,
            self.onReceiveMessageSeen,
            self.onUserListChange,
            self.onStarted);

        this.isPublic = ko.pureComputed<boolean>(() => {
            return (self.chattingWith() === null || self.chattingWith() === undefined);
        }, self);

        this.hasUnread = ko.pureComputed<boolean>(() => {
            for (let u of self.users())
            {
                for(let m of u.messages())
                {
                    if (m.user.id === self.id()) continue;

                    if (m.message.state() !== Status.Deliverded) continue;

                    return true;
                }
            }

            return false;
            
        }, self);

        this.filteredUsers = ko.pureComputed<ChatStateUser[]>(() => {
            if
                (
                self.usersFilter() === null ||
                self.usersFilter() === undefined ||
                self.usersFilter() === "" ||
                $.trim(self.usersFilter()).length === 0
            ) return self.users();

            return ko.utils.arrayFilter(self.users(),
                u => u.name.toLocaleLowerCase().indexOf
                    (self.usersFilter().toLocaleLowerCase()) !== -1);

        }, self);
    }

    public getUser = (id: string): ChatStateUser => {
        const self = this;
        return self.ko.utils.arrayFirst(self.users(), u=>u.id === id);
    }

    public onMessage = (userId: string, userName: string, message: Message<string>) => {
        const self = this;
        self.messages.push({ user: {
            id: userId,
            name: userName
        }, message: new StateMessage(self.ko, message) });
        self.autoScroll();
    }

    private updateMessageStatus = (userId: string, messageId: number, state: Status) => {
        const self = this;
        let user = self.getUser(userId);
        if (!user) {
            return;
        }

        let found = self.ko.utils.arrayFilter(user.messages(), (it: MessageInfo<any>) => {
            return it.message.now === messageId;
        });

        if (found.length === 0) return;

        found[0].message.state(state);
        self.checkSeen();
    }

    public onReceiveMessageDelivered = (userId: string, messageId: number) => {
        const self = this;
        self.updateMessageStatus(userId, messageId, Status.Deliverded);
    }

    public onReceiveMessageSeen = (userId: string, messageId: number) => {
        const self = this;
        self.updateMessageStatus(userId, messageId, Status.Seen);
    }

    public onPrivateMessage = (idFrom: string, message: Message<string>) => {
        const self = this;

        const userFrom = self.getUser(idFrom);
 
        let txtMessage = new StateMessage(self.ko, message);
        userFrom.messages.push({ user: userFrom.toUser(), message: txtMessage });
        self.scrollToFirstNotRead();

        self.chatConnection.sendMessageDelivered(idFrom, message.now);
        self.updateMessageStatus(idFrom, message.now, Status.Deliverded);
    }

    public onStarted = (id: string) => {
        const self = this;
        self.id(id);
    }

    public delChat = () => {
        const self = this;
        let u = self.chattingWith();
        if (!u) return;
        u.messages.removeAll();
        self.users(self.ko.utils.arrayFilter(self.users(), x => x.id !== u.id));
        self.chattingWith(null);
    }

    public onUserListChange = (list: ChatUser[]) => {
        const self = this;

        let connectedIds = self.ko.utils.arrayMap(list, u => u.id);

        let rescued = self.ko.utils.arrayFilter(self.users(), u => {
            let disconected = connectedIds.indexOf(u.id) === -1;
            if (disconected === false) return false;
            return u.messages().length > 0;
        });

        self.users.removeAll();
        for (let u of rescued) {
            u.connected(false);
        }
        self.users(rescued);
        let others = self.ko.utils.arrayFilter(list, u => u.id !== self.id());
        for (let u of others) {
            self.users.push(new ChatStateUser(self.ko, u));
        }
    }

    public scrollToFirstNotRead = () => {
        const self = this;
        let p = self.$("#mesagges p[data-msg-state=1]:first");
        if (p.length === 0) {
            // if all read go to last msg;
            self.autoScroll();
            return;
        }
        
        let marginTop = 100; //comes from css
        window.scrollTo(0, (p.offset().top - marginTop));     
    }

    public autoScroll = () => {
        const self = this;
        let p = self.$("#mesagges p:last");
        if (p.length === 0) return;

        window.scrollTo(0, p.offset().top);     
    }

    public sendMessage = () => {
        const self = this;
        let txtMessage = self.$("#txtMsg");
        let msg = self.message();

        if (self.$.trim(msg).length > 0) {
            const isPublic = self.isPublic();
            let sentMessage = StateMessage.createSent(msg);
            const item: MessageInfo<any> = { user: {
                id: self.id(),
                name: self.user.name
            }, message: new StateMessage(self.ko, sentMessage) };
            let send = isPublic ? () => self.chatConnection.send(sentMessage) : () => self.chatConnection.sendTo(sentMessage, self.chattingWith().id);
            let list: KnockoutObservableArray<MessageInfo<any>> = isPublic ? self.messages : self.chattingWith().messages;

            send();
            list.push(item);

            self.autoScroll();
        }

        self.message("");
        txtMessage.focus();
    }

    public privateChat = (to: ChatStateUser) => {
        const self = this;
        self.$('#tabMenu a[href="#nav-chat"]').tab('show');
        self.chattingWith(to);
    }

    public afterRender = () => {
        const self = this;

        let setup = () => {
            let txtMessage = self.$("#txtMsg");
            if (txtMessage.length > 0) {
                txtMessage.focus();
                let scrollfn = self.isPublic() ?
                self.autoScroll: self.scrollToFirstNotRead;
                scrollfn();
            }
            self.checkSeen();
        };
        self.$('#tabMenu a[href="#nav-chat"]').tab('show');
        self.$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
            setup();
        });
        setup();

        self.$(window).scroll(() => {
            self.checkSeen();
        });
    }

    public checkSeen = () => {
        const self = this;

        let isVissible =(p: JQuery<HTMLElement>) => {
            let marginTop = 100; //comes from css
            let height = p.height();
            let marginBottom = self.$(".bottom-nav:first").offset().top - height; //comes from css
            
            return (p.offset().top >= marginTop && p.offset().top <= marginBottom);            
        };

        self.$("#mesagges p.msgEntrante").each((i, el) => {
            let it = self.$(el);
            if (it.attr("data-msg-state") === "1" && isVissible(it)) {
                let msgData = self.ko.contextFor(el).$data;
                
                msgData.message.state(Status.Seen);
                self.chatConnection.sendMessageSeen(self.chattingWith().id, msgData.message.now);
            }
        });
    }    
}