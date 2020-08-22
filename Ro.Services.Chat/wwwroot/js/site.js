const urlBase = $("#urlBase").val();
const urlHome = $("#urlHome").val();

const connection = new signalR.HubConnectionBuilder()
    .withUrl(`${urlBase}/chathub`)
    .configureLogging(signalR.LogLevel.Information)
    .build();

async function start(info) {
    try {
        await connection.start(info);
        setInfo(info);
        console.log("connected");
    } catch (err) {
        console.log(err);
        setTimeout(() => start(info), 5000);
    }
};

connection.onclose(async () => {
    const info = getUserInfo();
    await start(info);
});

connection.on("ReceiveMessage", (user, message) => {
    appendMsg(user, message, false);
});

function appendMsg(user, msg, isLocal) {
    let list = $("#mesagges");
    let row = $("<div class='row'></div>");
    let col = $("<div class='col'></div>");
    let p = isLocal ?
        $(`<p class='alert alert-info text-right'>${msg}</p>`) :
        $(`<p class='alert alert-light'>${user}>> ${msg}</p>`);

    row.append(col);
    col.append(p);

    list.append(row);

    window.scrollTo(0, p.offset().top);
};

async function send(info, msg) {
    try {
        connection.invoke("SendMessage", info, msg);
    } catch (err) {
        setTimeout(() => start(info), 5000);
    }
};

async function setInfo(info) {
    try {
        connection.invoke("SetInfo", info);
    } catch (err) {
        setTimeout(() => start(), 5000);
    }
};

function getUserInfo() {
    const urlParams = new URLSearchParams(window.location.search);
    const user = urlParams.get('user');
    const group = urlParams.get('group');
    const info = { name: user, group };

    if ($.trim(user).length === 0 || $.trim(group).length === 0) {
        window.location.href = urlHome;
        return;
    }
    return info;
}

$(() => {
    const info = getUserInfo();

    start(info);

    let txtMessage = $("#txtMsg");
    txtMessage.focus();

    $("#frmMsg").on("submit", (e) => {
        e.preventDefault();
        let msg = txtMessage.val();
        txtMessage.val("");
        txtMessage.focus();

        if ($.trim(msg).length > 0) {
            send(info, msg);
            appendMsg(info.name, msg, true);
        }
    });
});