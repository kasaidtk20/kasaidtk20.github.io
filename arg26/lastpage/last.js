var scroll;
var winH = $(window).height();
var objTop = $('.obj').offset().top;
var isShown = false;

$(window).on('scroll', function () {
    scroll = $(window).scrollTop();

    if (scroll >= objTop - winH && !isShown) {
        var now = new Date();
        var y = now.getFullYear();
        var m = now.getMonth() + 1;
        var d = now.getDate();
        var h = now.getHours();
        var mi = now.getMinutes();
        var s = now.getSeconds();
        
        $("#last-date").text(y + "/" + m + "/" + d + " "+ h +":" + mi + ":" + s);
        $('#modal-overlay').fadeIn();
        isShown = true;
    }
});