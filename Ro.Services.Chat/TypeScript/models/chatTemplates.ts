import { UserInfo } from '../models/userInfo';
import { ChatUser } from '../models/chatUser';
import { ChatConnection } from './ChatConnection';

export interface MessageInfo {
    user: string;
    message: string;
    isLocal: boolean;
}

export class ChatTemplates {
    public current: KnockoutObservable<string>;
    public message: KnockoutObservable<string>;
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
        this.messages = ko.observableArray<MessageInfo>([]);
        this.users = ko.observableArray<ChatUser>([]);
        $("#txtMsg").focus();
        const self = this;
        this.chatConnection = new ChatConnection(user, urlSignalr, self.onMessage, self.onUserListChange);
    }

    public onMessage = (user: string, message: string) => {
        const self = this;
        self.messages.push({ user, message, isLocal: false });
        self.autoScroll();
    }

    public onUserListChange = (list: ChatUser[]) => {
        const self = this;
        console.dir(list);
        self.users(list);
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
            self.messages.push({ user: self.user.name, message: msg, isLocal: true });
            self.autoScroll();
        }

        self.message("");
        txtMessage.focus();
    }

}