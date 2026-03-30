$(document).ready(function () {
    // 初期設定系(当初JS非実行環境で表示崩れを防ぐために入れていたが、最終的にslickを導入しているため結局jsがないと表示は崩れる)
    $(".type-tag").css("display", "inline-block");
    $(".type").css("visibility", "hidden");


    $('.top-slider').slick({
        autoplay: true,
        dots: false,
        arrows: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        speed: 1500,
        autoplaySpeed: 5000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    autoplay: true,
                }
            },
            {
                breakpoint: 601,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    autoplay: true,
                }
            },
        ]
    });

    $('.center').slick({
        centerMode: true,
        centerPadding: '60px',
        slidesToShow: 3,
        infinite: true,
        autoplaySpeed: 5000,
        adaptiveHeight: false,
        autoplay: true,
        dots: true,
        focusOnSelect: true,
        accessibility: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    centerMode: true,
                    centerPadding: '25%',
                    arrows: false,
                    dots: true,
                }
            },
            {
                breakpoint: 601,
                settings: {
                    slidesToShow: 1,
                    centerMode: true,
                    centerPadding: '20%',
                    arrows: false,
                    dots: true,
                }
            },
            {
                breakpoint: 451,
                settings: {
                    slidesToShow: 1,
                    centerMode: true,
                    centerPadding: '15%',
                    arrows: false,
                }
            }
        ]
    });


    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-show');
            }
        });
    }, {
        threshold: 0.2
    });

    document.querySelectorAll('.fade-up').forEach(el => {
        fadeObserver.observe(el);
    });

    const options = {
        root: null,
        rootMargin: "0px",
        threshold: 0.5
    }

    const callback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetElement = entry.target;
                const $target = $(targetElement);

                const delayTime = $target.data("delay") || 0;
                const speedVary = $target.data("speed") || true;

                setTimeout(() => {
                    $target.css("visibility", "visible");
                    $target.t({
                        blink_perm: false,
                        blink: true,
                        speed_vary: false,
                        mistype: false,
                        fin: function (elm) {
                            $(elm).find(".type-tag").fadeOut(300, function () {
                                $(this).remove();
                                $(elm).find(".type-string").removeClass("type-string")
                            });
                            $(elm).find(".t-caret").fadeOut(300, function () {
                                $(this).remove();
                            });

                        }
                    });
                }, delayTime);
                observer.unobserve(targetElement);
            }
        });
    };

    const observer = new IntersectionObserver(callback, options);

    $(".type").each(function () {
        observer.observe(this);
    });


    $('.activity-box').on('click', function () {
        openActivityModal(this);
    });

    $('#modal-overlay').on('click', function () {
        closeModal();
    });

    $('.modal-content').on('click', function (e) {
        e.stopPropagation();
    });
});

function openActivityModal(element) {
    const $el = $(element);
    const title = $el.find('.activity-title').text();
    const $img = $el.find('.activity-image img');

    let fullDesc = $el.find('.modal-data').html();
    if (!fullDesc || fullDesc.trim() === "") {
        fullDesc = $el.find('.activity-desc').html();
    }
    let modalHtml = `
        <div class="modal-fixed-part">
            <h2 style="margin: 0 0 15px 0; padding-right: 40px;"><span class="background-liner">${title}</span></h2>
    `;

    if ($img.length > 0) {
        modalHtml += `<img src="${$img.attr('src')}" style="width:100%; border-radius:10px; margin-bottom:15px; height:auto; display:block;">`;
    }
    modalHtml += `</div>`;
    modalHtml += `
        <div class="modal-scroll-part">
            <div style="line-height:1.8; color:#333;">${fullDesc}</div>
        </div>
    `;

    $('#modal-body').html(modalHtml);

    $('#modal-overlay').fadeIn(300).css('display', 'flex');
    $('body').css('overflow', 'hidden');
}

function closeModal() {
    $('#modal-overlay').fadeOut(300, function(){
        $('#modal-body').html("");
    });
    $('body').css('overflow', 'auto');
}