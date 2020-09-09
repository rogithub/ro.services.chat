import { Status } from "./status";
import { Message } from "./message";

export class StateMessage<T> {
    public now: number;
    public content: T;
    public state: KnockoutObservable<Status>;
    public time: KnockoutComputed<string>;
    ko: KnockoutStatic;

    constructor(ko: KnockoutStatic, message: Message<T>) {
        this.ko = ko;
        this.content = message.content;
        this.now = message.now;
        this.state = ko.observable<Status>(message.state);

        const self = this;
        this.time = ko.pureComputed(() => {
            let d = new Date(self.now);
            return d.toLocaleTimeString('en-US',
                {
                    hour12: true,
                    hour: '2-digit',
                    minute: '2-digit'
                });
        }, self);
    }

    public static createSent = <T>(content: T): Message<T> => {
        return {
            now: Date.now(),
            content: content,
            state: Status.Sent
        }
    }
}