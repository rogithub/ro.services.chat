import { UserInfo } from '../models/userInfo';
import { ChatUser } from '../models/chatUser';
import * as signalR from '@microsoft/signalr';

export class ChatConnection {
    public urlSignalr: string;
    public connection: signalR.HubConnection;
    public user: UserInfo;
    public id: KnockoutObservable<string>;

    constructor(
        user: UserInfo,
        urlSignalr: string,
        onMessage: (user: string, message: string) => void,
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
        self.connection.on("UsersListChange", onUserListChange);
        self.connection.on("SetOwnId", onStarted);
    }

    send = async (msg: string) => {
        const self = this;
        self.connection.invoke("SendMessage", self.user, msg);
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