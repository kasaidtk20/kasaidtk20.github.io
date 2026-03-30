async function getChatJson() {
    try{
        const data = await $.getJSON("/arg26/chatpage/chatpage.json");

        return data;
    }catch(error){
        console.error("データの読み込みに失敗しました:", error);
    }
}

function searchChatContent(inputUrl,json){
    const data = json;

    const result = data.pages.find(item => item.url === inputUrl);
    return result;
}

function searchMenberFromId(inputId,json){
    const data = json;

    const result = data.member.find(item => item.id === inputId);
    return result;
}