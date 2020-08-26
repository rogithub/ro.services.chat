import { UserInfo } from '../models/userInfo';
import { ChatUser } from '../models/chatUser';
import { ChatConnection } from './chatConnection';
import { MessageInfo } from './messageInfo';
import { ObjectLiteral } from '../shared/objectLiteral';

export class ChatTemplates {
    public current: KnockoutObservable<string>;
    public message: KnockoutObservable<string>;
    public id: KnockoutObservable<string>;
    public chattingWith: KnockoutObservable<ChatUser>;
    public isPublic: KnockoutComputed<boolean>;
    public $: JQueryStatic;
    public ko: KnockoutStatic;
    public user: UserInfo;
    public urlSignalr: string;
    public chatConnection: ChatConnection;
    public messages: KnockoutObservableArray<MessageInfo>;
    public users: KnockoutObservableArray<ChatUser>;
    public privateMessages: ObjectLiteral;

    constructor(ko: KnockoutStatic, $: JQueryStatic, user: UserInfo, urlSignalr: string) {
        this.ko = ko;
        this.$ = $;
        this.user = user;
        this.urlSignalr = urlSignalr;
        this.current = ko.observable<string>("ChatPartial");
        this.message = ko.observable<string>("");
        this.id = ko.observable<string>("");
        this.chattingWith = ko.observable<ChatUser>();
        this.messages = ko.observableArray<MessageInfo>([]);
        this.users = ko.observableArray<ChatUser>([]);
        this.privateMessages = {};
        $("#txtMsg").focus();
        const self = this;
        this.chatConnection = new ChatConnection(
            user, urlSignalr,
            self.onMessage,
            self.onPrivateMessage,
            self.onUserListChange,
            self.onStarted);

        this.isPublic = ko.pureComputed<boolean>(() => {
            return (self.chattingWith() === null || self.chattingWith() === undefined);
        }, self);
    }

    public onMessage = (user: string, message: string) => {
        const self = this;
        self.messages.push({ user, message, isLocal: false, date: new Date() });
        self.autoScroll();
    }

    public onPrivateMessage = (idFrom: string, message: string) => {
        const self = this;

        if (!self.privateMessages[idFrom]) {
            self.privateMessages[idFrom] = self.ko.observableArray<MessageInfo>();
        }

        console.dir(self.privateMessages[idFrom]());

        let user = self.ko.utils.arrayFirst(self.users(), u => u.id === idFrom);
        if (user === null || user === undefined) {
            user = {
                id: idFrom,
                name: "Desconectado"
            };
        }

        self.privateMessages[idFrom].push({ user: user.name, message, isLocal: false, date: new Date() });
        self.autoScroll();
    }

    public onStarted = (id: string) => {
        const self = this;
        self.id(id);
    }

    public onUserListChange = (list: ChatUser[]) => {
        const self = this;
        let others = self.ko.utils.arrayFilter(list, u => u.id !== self.id());
        self.users(others);
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
            const item: MessageInfo = { user: self.user.name, message: msg, isLocal: true, date: new Date() };
            let send = isPublic ? () => self.chatConnection.send(msg) : () => self.chatConnection.sendTo(msg, self.chattingWith().id);
            let list: KnockoutObservableArray<MessageInfo> = isPublic ? self.messages : self.privateMessages[self.chattingWith().id];

            send();
            list.push(item);

            self.autoScroll();
        }

        self.message("");
        txtMessage.focus();
    }

    public privateChat = (to: ChatUser) => {
        const self = this;
        if (!self.privateMessages[to.id]) {
            self.privateMessages[to.id] = self.ko.observableArray<MessageInfo>();
        }
        self.current("ChatPartial");
        self.chattingWith(to);
    }

}