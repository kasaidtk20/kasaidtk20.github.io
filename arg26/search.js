$('#searchBtn').on('click', function () {
    jumpToSearchPage();
});
$("#search-input").on("keypress", function (e) {
    if (e.which === 13) {
        jumpToSearchPage();
    }
});

async function searchJsonByKeyword(inputWord) {
    try {
        const data = await $.getJSON("/arg26/search.json");

        const result = data.searchs.find(item => item.keyword === inputWord);
        console.log(result);
        return result;
    } catch (error) {
        console.error("データの読み込みに失敗しました:", error);
    }
}

function getParameterByName(name) {
    const params = new URLSearchParams(window.location.search);
    const value = params.get(name);
    return value;
}

function jumpToSearchPage() {
    var word = $("#search-input").val();
    if (!word) return;

    var url = "/arg26/find/index.html?search=" + encodeURIComponent(word);
    window.location.href = url;
    if (window.location.pathname.includes("/arg26/find/")) {
        
    } else {
        //window.open(url, '_blank');
    }
}