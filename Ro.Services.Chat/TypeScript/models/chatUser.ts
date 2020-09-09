import { MessageInfo, Status } from "./message";

export interface ChatUser {
    id: string;
    name: string;
}

export class ChatStateUser {
    public id: string;
    public name: string;
    public connected: KnockoutObservable<boolean>;
    public messages: KnockoutObservableArray<MessageInfo>;
    public unread: KnockoutComputed<number>;
    
    constructor(ko:KnockoutStatic, u: ChatUser, connected: boolean = true)
    {
        this.id = u.id;
        this.name = u.name;
        this.connected = ko.observable<boolean>(connected);
        this.messages = ko.observableArray<MessageInfo>()
        const self = this;
        this.unread = ko.pureComputed<number>(() => {

            return ko.utils.arrayFilter(self.messages(), 
            m => m.message.state() === Status.Deliverded).length;

        }, self);
    }
}