import { Status } from "./status";


export interface Message<T> {
    state: Status;
    content: T;
    now: number;
}

