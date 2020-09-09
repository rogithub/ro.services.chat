import { ChatUser } from "./chatUser";
import { StateMessage } from "./stateMessage";


export interface MessageInfo<T> {
    user: ChatUser;
    message: StateMessage<T>;
}
