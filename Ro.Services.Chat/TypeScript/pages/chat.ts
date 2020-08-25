import { ChatTemplates } from '../models/chatTemplates';
import { UserInfo } from '../models/userInfo';
import { BinderService } from '../services/binderService';

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

$(() => {
    let info = getUserInfo();
    if (info === null) return;


    let model = new ChatTemplates(ko, $, info, urlSignalr);
    model.chatConnection.start();

    BinderService.bind($, model, "#main");
});