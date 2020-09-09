import { Status } from "./status";


export interface Message {
    state: Status;
    content: string;
    now: number;
}

