const urlBase = $("#urlBase").val();
const urlHome = $("#urlHome").val();

const connection = new signalR.HubConnectionBuilder()
    .withUrl(`${urlBase}/chathub`)
    .configureLogging(signalR.LogLevel.Information)
    .build();

async function start() {
    try {
        await connection.start();
        console.log("connected");
    } catch (err) {
        console.log(err);
        setTimeout(() => start(), 5000);
    }
};

connection.onclose(async () => {
    await start();
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
        $(`<p class='alert alert-info'>${user}>> ${msg}</p>`);

    row.append(col);
    col.append(p);

    list.append(row);

    window.scrollTo(0, p.offset().top);
};

async function send(user, msg) {
    try {
        connection.invoke("SendMessage", user, msg);
    } catch (err) {
        setTimeout(() => start(), 5000);
    }
};

$(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const user = urlParams.get('user');

    if ($.trim(user).length === 0) {
        window.location.href = urlHome;
        return;
    }

    start();
    let txtMessage = $("#txtMsg");
    txtMessage.focus();

    $("#frmMsg").on("submit", (e) => {
        e.preventDefault();
        let msg = txtMessage.val();
        txtMessage.val("");
        txtMessage.focus();

        if ($.trim(msg).length > 0) {
            send(user, msg);
            appendMsg(user, msg, true);
        }
    });
});