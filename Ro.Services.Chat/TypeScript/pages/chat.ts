import { ChatTemplates } from '../models/chatTemplates';
import { UserInfo } from '../models/userInfo';
import { BinderService } from '../services/binderService';
import { JsonReq } from '../services/jsonReq';
import { ChatUser } from '../models/chatUser';

const urlBase = $("#urlBase").val() as string;
const urlHome = $("#urlHome").val() as string;
const urlSignalr = `${urlBase}/chathub`;

let getUserInfo = (): UserInfo => {
    const urlParams = new URLSearchParams(window.location.search);
    const user = urlParams.get('user');
    const group = urlParams.get('group');
    const info = { name: user, group };

    if ($.trim(user).length === 0 || $.trim(group).length === 0) {
        window.location.href = urlHome;
        return null;
    }

    return info;
}

$(async () => {
    let info = getUserInfo();
    if (info === null) return;

    let api = new JsonReq(urlBase, window);
    let model = new ChatTemplates(ko, $, info, urlSignalr);

    model.id.subscribe(async (id: string) => {
        var users = await api.get<ChatUser[]>(`GetUsers?group=${info.group}`);
        model.users(ko.utils.arrayFilter(users, u => u.id !== id));
    });

    await model.chatConnection.start();
    BinderService.bind($, model, "#main");

});