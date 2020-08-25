import * as signalR from '@microsoft/signalr';
import { UserInfo } from '../models/userInfo';

export class ChatConnection {
    public urlSignalr: string;
    public connection: signalR.HubConnection;
    public user: UserInfo;

    constructor(user: UserInfo, urlSignalr: string, onMessage: (user: UserInfo, message: string) => void) {
        this.user = user;
        this.urlSignalr = urlSignalr;
        this.connection = new signalR.HubConnectionBuilder()
            .withUrl(urlSignalr)
            .configureLogging(signalR.LogLevel.Information)
            .build();

        const self = this;
        self.connection.onclose(async () => {
            await self.start();
        });

        self.connection.on("ReceiveMessage", onMessage);
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
            console.log("connected");

        } catch (err) {
            console.log(err);
            setTimeout(() => self.start(), 5000);
        }
    };
}