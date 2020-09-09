import { ChatUser } from "./chatUser";
import { MessageInfo } from "./messageInfo";
import { Status } from "./status";

export class ChatStateUser {
    public id: string;
    public name: string;
    public connected: KnockoutObservable<boolean>;
    public messages: KnockoutObservableArray<MessageInfo<any>>;
    public unread: KnockoutComputed<MessageInfo<any>[]>;
    
    constructor(ko:KnockoutStatic, u: ChatUser, connected: boolean = true)
    {
        this.id = u.id;
        this.name = u.name;
        this.connected = ko.observable<boolean>(connected);
        this.messages = ko.observableArray<MessageInfo<any>>()
        const self = this;
        this.unread = ko.pureComputed<MessageInfo<any>[]>(() => {

            return ko.utils.arrayFilter(self.messages(), 
            m => m.message.state() === Status.Deliverded);

        }, self);
    }

    public toUser = (): ChatUser => {
        const self = this;
        return {
            id: self.id,
            name: self.name
        };
    }
}