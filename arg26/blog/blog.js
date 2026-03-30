async function getBlogJson() {
    try{
        const data = await $.getJSON("/arg26/blog/blog.json");

        return data;
    }catch(error){
        console.error("データの読み込みに失敗しました:", error);
    }
}

function searchBlogContent(inputUrl,json){
    const data = json;

    const result = data.article.find(item => item.url === inputUrl);
    return result;
}

function searchMenberFromId(inputId,json){
    const data = json;

    const result = data.member.find(item => item.id === inputId);
    return result;
}