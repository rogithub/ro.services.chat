import { UserInfo } from '../models/userInfo';
import { ChatUser } from '../models/chatUser';
import { ChatConnection } from './ChatConnection';
import { MessageInfo } from './messageInfo';

export class ChatTemplates {
    public current: KnockoutObservable<string>;
    public message: KnockoutObservable<string>;
    public id: KnockoutObservable<string>;
    public $: JQueryStatic;
    public ko: KnockoutStatic;
    public user: UserInfo;
    public urlSignalr: string;
    public chatConnection: ChatConnection;
    public messages: KnockoutObservableArray<MessageInfo>;
    public users: KnockoutObservableArray<ChatUser>;

    constructor(ko: KnockoutStatic, $: JQueryStatic, user: UserInfo, urlSignalr: string) {
        this.ko = ko;
        this.$ = $;
        this.user = user;
        this.urlSignalr = urlSignalr;
        this.current = ko.observable<string>("ChatPartial");
        this.message = ko.observable<string>("");
        this.id = ko.observable<string>("");
        this.messages = ko.observableArray<MessageInfo>([]);
        this.users = ko.observableArray<ChatUser>([]);
        $("#txtMsg").focus();
        const self = this;
        this.chatConnection = new ChatConnection(
            user, urlSignalr,
            self.onMessage,
            self.onUserListChange,
            self.onStarted);
    }

    public onMessage = (user: string, message: string) => {
        const self = this;
        self.messages.push({ user, message, isLocal: false, date: new Date() });
        self.autoScroll();
    }

    public onStarted = (id: string) => {
        const self = this;
        self.id(id);
        console.log("connected", id);
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
            self.chatConnection.send(msg);
            self.messages.push({ user: self.user.name, message: msg, isLocal: true, date: new Date() });
            self.autoScroll();
        }

        self.message("");
        txtMessage.focus();
    }

}