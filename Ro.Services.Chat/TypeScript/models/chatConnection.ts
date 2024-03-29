import { UserInfo } from './userInfo';
import { ChatUser } from './chatUser';
import * as signalR from '@microsoft/signalr';
import { Message } from './message';

export class ChatConnection {
    public urlSignalr: string;
    public connection: signalR.HubConnection;
    public user: UserInfo;
    public id: KnockoutObservable<string>;

    constructor(
        user: UserInfo,
        urlSignalr: string,
        onMessage: (userId: string, userName: string, message: Message<string>) => void,
        onPrivateMessage: (id: string, message: Message<string>) => void,
        onReceiveMessageDelivered: (userId: string, messageId: number) => void,
        onReceiveMessageSeen: (userId: string, messageId: number) => void,
        onUserListChange: (list: ChatUser[]) => void,
        onStarted: (id: string) => void) {
        this.user = user;
        this.urlSignalr = urlSignalr;
        this.connection = new signalR.HubConnectionBuilder()
            .withUrl(urlSignalr)
            .configureLogging(signalR.LogLevel.Information)
            .build();

        const self = this;
        self.id = ko.observable<string>("");
        self.connection.onclose(async () => {
            await self.start();
        });

        self.connection.on("ReceiveMessage", onMessage);
        self.connection.on("ReceivePrivateMessage", onPrivateMessage);
        self.connection.on("ReceiveMessageDelivered", onReceiveMessageDelivered);
        self.connection.on("ReceiveMessageSeen", onReceiveMessageSeen);
        self.connection.on("UsersListChange", onUserListChange);
        self.connection.on("SetOwnId", onStarted);
    }

    send = async (msg: Message<string>) => {
        const self = this;
        self.connection.invoke("SendMessage", self.user, msg);
    };

    sendTo = async (msg: Message<string>, id: string) => {
        const self = this;
        self.connection.invoke("SendMessageTo", id, msg);
    };

    sendMessageDelivered = async (userId: string, messageId: number) => {
        const self = this;
        self.connection.invoke("SendMessageDelivered", userId, messageId);
    };

    sendMessageSeen = async (userId: string, messageId: number) => {
        const self = this;
        self.connection.invoke("SendMessageSeen", userId, messageId);
    };

    setInfo = async () => {
        const self = this;
        self.connection.invoke("SetInfo", self.user);
    };

    start = async () => {
        const self = this;
        try {
            await self.connection.start();
            await self.setInfo();
        } catch (err) {
            console.log(err);
            setTimeout(() => self.start(), 5000);
        }
    };
}