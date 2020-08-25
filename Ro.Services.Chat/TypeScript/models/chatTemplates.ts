import { UserInfo } from '../models/userInfo';
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

    constructor(ko: KnockoutStatic, $: JQueryStatic, user: UserInfo, urlSignalr: string) {
        this.ko = ko;
        this.$ = $;
        this.user = user;
        this.urlSignalr = urlSignalr;
        this.current = ko.observable<string>("ChatPartial");
        this.message = ko.observable<string>("");
        this.messages = ko.observableArray<MessageInfo>([]);
        $("#txtMsg").focus();
        const self = this;
        this.chatConnection = new ChatConnection(user, urlSignalr, self.onMessage);
    }

    public onMessage = (user: string, message: string) => {
        const self = this;
        self.messages.push({ user, message, isLocal: false });
        self.autoScroll();
    }

    public autoScroll = () => {
        const self = this;
        let p = self.$("#mesagges p:last");
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