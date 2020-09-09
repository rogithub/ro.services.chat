import { ChatUser } from "./chatUser";
import { TextMessage } from "./textMessage";


export interface MessageInfo {
    user: ChatUser;
    message: TextMessage;
}
