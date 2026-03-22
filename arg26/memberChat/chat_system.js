

async function displayChats() {
    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    const chatF = $("#chats-field");
    const loading = $("#load");
    const data = await $.getJSON("chat.json");
    for (const val of data.chats) {
        var now = new Date();
        var y = now.getFullYear();
        var m = now.getMonth() + 1;
        var d = now.getDate();
        var h = now.getHours();
        if (h < 10) h = "0" + h; 
        var mi = now.getMinutes();
        if (mi < 10) mi = "0" + mi;
        var s = now.getSeconds();
        if (s< 10) s = "0" + s;
        const $chatItem = $(`<div class="chat-wrap">
                <div class="chat-icon"><img src="/picture/dtk_icon.png"></div>
                <div>
                    <div class="chat-user"><a href="/arg26">`+ val.user +`</a> : <span class="chat-date">`+y+ "/"+ m + "/" + d+ " " + h+ ":"+ mi + ":" + s+`</span>&nbsp;&nbsp;ID : xxueo12</div>
                    <div class="bubble left">`+ val.message +
                    `</div>
                </div>
            </div>`).hide();
        chatF.append($chatItem);
        
        // ふわっと表示させる（任意）
        $chatItem.fadeIn(300);
        await sleep(500);
        loading.fadeIn(200);
        await sleep(2000);
        $("html,body").animate({scrollTop:$("#chat-end").offset().top});
        loading.hide();
    }
}