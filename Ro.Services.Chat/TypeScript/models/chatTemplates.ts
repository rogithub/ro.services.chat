import { UserInfo } from '../models/userInfo';
import { ChatUser, ChatStateUser } from '../models/chatUser';
import { ChatConnection } from './chatConnection';
import { ObjectLiteral } from '../shared/objectLiteral';
import { MessageInfo, TextMessage, Message, Status } from './message';

export class ChatTemplates {

    public message: KnockoutObservable<string>;
    public id: KnockoutObservable<string>;
    public chattingWith: KnockoutObservable<ChatStateUser>;
    public isPublic: KnockoutComputed<boolean>;
    public $: JQueryStatic;
    public ko: KnockoutStatic;
    public user: UserInfo;
    public urlSignalr: string;
    public chatConnection: ChatConnection;
    public messages: KnockoutObservableArray<MessageInfo>;
    public users: KnockoutObservableArray<ChatStateUser>;
    public usersFilter: KnockoutObservable<string>;
    public filteredUsers: KnockoutComputed<ChatStateUser[]>;
    public privateMessages: ObjectLiteral;

    constructor(ko: KnockoutStatic, $: JQueryStatic, user: UserInfo, urlSignalr: string) {
        this.ko = ko;
        this.$ = $;
        this.user = user;
        this.urlSignalr = urlSignalr;
        this.message = ko.observable<string>("");
        this.id = ko.observable<string>("");
        this.usersFilter = ko.observable<string>("");
        this.chattingWith = ko.observable<ChatStateUser>();
        this.messages = ko.observableArray<MessageInfo>([]);
        this.users = ko.observableArray<ChatStateUser>([]);
        this.privateMessages = {};
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

    public onMessage = (user: string, message: Message) => {
        const self = this;
        self.messages.push({ user, message: new TextMessage(self.ko, message), isLocal: false });
        self.autoScroll();
    }

    private updateMessageStatus = (userId: string, messageId: number, state: Status) => {
        const self = this;

        if (!self.privateMessages[userId]) {
            return;
        }

        let found = self.ko.utils.arrayFilter(self.privateMessages[userId](), (it: MessageInfo) => {
            return it.message.now === messageId;
        });

        if (found.length > 0) {
            found[0].message.state(state);
        }

    }

    public onReceiveMessageDelivered = (userId: string, messageId: number) => {
        const self = this;
        self.updateMessageStatus(userId, messageId, Status.Deliverded);
    }

    public onReceiveMessageSeen = (userId: string, messageId: number) => {
        const self = this;
        self.updateMessageStatus(userId, messageId, Status.Seen);
    }

    public onPrivateMessage = (idFrom: string, message: Message) => {
        const self = this;

        if (!self.privateMessages[idFrom]) {
            self.privateMessages[idFrom] = self.ko.observableArray<MessageInfo>();
        }

        let user = self.ko.utils.arrayFirst(self.users(), u => u.id === idFrom);
        if (user === null || user === undefined) {
            user = new ChatStateUser(self.ko, {
                id: idFrom,
                name: "Desconectado"
            }, false);
        }

        let txtMessage = new TextMessage(self.ko, message);
        self.privateMessages[idFrom].push({ user: user.name, message: txtMessage, isLocal: false });
        self.autoScroll();

        self.chatConnection.sendMessageDelivered(idFrom, message.now);
    }

    public onStarted = (id: string) => {
        const self = this;
        self.id(id);
    }

    public delChat = () => {
        const self = this;
        let u = self.chattingWith();
        if (!u) return;
        delete self.privateMessages[u.id];
        self.users(self.ko.utils.arrayFilter(self.users(), x => x.id !== u.id));
        self.chattingWith(null);
    }

    public onUserListChange = (list: ChatUser[]) => {
        const self = this;

        let connectedIds = self.ko.utils.arrayMap(list, u => u.id);

        let rescued = self.ko.utils.arrayFilter(self.users(), u => {
            let disconected = connectedIds.indexOf(u.id) === -1;
            if (disconected === false) return false;

            let emptyMessages = (self.privateMessages[u.id] === null ||
                self.privateMessages[u.id] === undefined);

            if (emptyMessages) return false;

            return self.privateMessages[u.id]().length > 0;
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
            let sentMessage = TextMessage.createSent(msg);
            const item: MessageInfo = { user: self.user.name, message: new TextMessage(self.ko, sentMessage), isLocal: true };
            let send = isPublic ? () => self.chatConnection.send(sentMessage) : () => self.chatConnection.sendTo(sentMessage, self.chattingWith().id);
            let list: KnockoutObservableArray<MessageInfo> = isPublic ? self.messages : self.privateMessages[self.chattingWith().id];

            send();
            list.push(item);

            self.autoScroll();
        }

        self.message("");
        txtMessage.focus();
    }

    public privateChat = (to: ChatStateUser) => {
        const self = this;
        if (!self.privateMessages[to.id]) {
            self.privateMessages[to.id] = self.ko.observableArray<MessageInfo>();
        }
        self.$('#tabMenu a[href="#nav-chat"]').tab('show');
        self.chattingWith(to);
    }

    public afterRender = () => {
        const self = this;
        let setup = () => {
            let txtMessage = self.$("#txtMsg");
            if (txtMessage.length > 0) {
                self.autoScroll();
                txtMessage.focus();
            }
        };
        self.$('#tabMenu a[href="#nav-chat"]').tab('show');
        self.$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
            setup();
        });
        setup();
    }

    public onMessageScroll = (m: MessageInfo, event: Event) => {
        const self = this;
        if (m.isLocal) return;

        console.log("scrolling ", m.message.state());
        if (m.message.state() !== Status.Deliverded) return;

        if (self.$(event.target).is("visible")) {
            console.log("visible ", m.message.content);
            m.message.state(Status.Seen);
            self.chatConnection.sendMessageSeen(self.id(), m.message.now);
        }
    }

}