function searchMemberFromId(inputId, json) {
    const data = json;

    const result = data.member.find(item => item.id === inputId);
    return result;
}

async function displayChats() {
    var now = new Date();
    var y = now.getFullYear();
    var m = now.getMonth() + 1;
    var d = now.getDate();
    var h = now.getHours();
    $("#date").text(y+"年"+m+"月"+d+"日");
    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    const chatF = $("#chats-field");
    const loading = $("#load");
    const data = await $.getJSON("chat.json");
    for (const val of data.chats) {
        var member = searchMemberFromId(val.user, data);
        if (val.waittime != 0) {
            $("#next-user").text(member.name);
            await sleep(500);
            loading.fadeIn(200);
            await sleep(val.waittime);
            $("html,body").animate({ scrollTop: $("#chat-end").offset().top });
            loading.hide();
        }

        var now = new Date();
        var y = now.getFullYear();
        var m = now.getMonth() + 1;
        var d = now.getDate();
        var h = now.getHours();
        if (h < 10) h = "0" + h;
        var mi = now.getMinutes();
        if (mi < 10) mi = "0" + mi;
        var s = now.getSeconds();
        if (s < 10) s = "0" + s;
        const $chatItem = $(`<div class="chat-wrap">
                <div class="chat-icon"><img src="` + member.icon + `"></div>
                <div>
                    <div class="chat-user"><a href="/arg26">`+ member.name + `</a> : <span class="chat-date">` + y + "/" + m + "/" + d + " " + h + ":" + mi + ":" + s + `</span>&nbsp;&nbsp;&nbsp;<span class="mobile-only"><br></span>ID : ` + member.chat_id + `</div>
                    <div class="bubble left">`+ val.message +
            `</div>
                </div>
            </div>`).hide();
        chatF.append($chatItem);
        $chatItem.fadeIn(300);
    }
    $("#end").fadeIn(500);
}