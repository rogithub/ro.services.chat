export enum Status {
    Sent,
    Deliverded,
    Seen
}

export interface Message {
    now: number;
    content: string;
    state: Status;
}

export interface PrivateMessageInfo {
    user: string;
    message: TextMessage;
    isLocal: boolean;
    date: Date
}

export class TextMessage {
    public now: number;
    public content: string;
    public state: KnockoutObservable<Status>;
    ko: KnockoutStatic;

    constructor(ko: KnockoutStatic, message: Message) {
        this.ko = ko;
        this.content = message.content;
        this.now = message.now;
        this.state = ko.observable<Status>(Status.Deliverded);
    }

    public static create = (content: string): Message => {
        return {
            now: Date.now(),
            content: content,
            state: Status.Sent
        }
    }
}