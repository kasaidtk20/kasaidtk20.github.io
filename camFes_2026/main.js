$(document).ready(function () {
    if ($(".works-main").length && typeof $.fn.slick === "function") {
        $(".works-main").slick({
            centerMode: true,
            centerPadding: "60px",
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
            autoplay: true,
            autoplaySpeed: 5000,
            adaptiveHeight: false,
            dots: true,
            arrows: true,
            focusOnSelect: true,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 1,
                        centerPadding: "25%",
                        arrows: false
                    }
                },
                {
                    breakpoint: 601,
                    settings: {
                        slidesToShow: 1,
                        centerPadding: "20%",
                        arrows: false
                    }
                },
                {
                    breakpoint: 451,
                    settings: {
                        slidesToShow: 1,
                        centerPadding: "15%",
                        arrows: false
                    }
                }
            ]
        });

    }

    if (typeof $.fn.mgGlitch === "function") {
        $(".collabo").each(function () {
            const $section = $(this);
            if ($section.parent().hasClass("collabo-glitch-stage")) return;

            $section.wrap('<div class="collabo-glitch-stage"></div>');
            $section.mgGlitch({
                destroy: false,
                glitch: true,
                scale: true,
                blend: true,
                blendModeType: "hue",
                glitch1TimeMin: 10,
                glitch1TimeMax: 100,
                glitch2TimeMin: 10,
                glitch2TimeMax: 300
            });

            // The static back layer supplies layout and interactive content.
            // Animated copies must not duplicate links in keyboard navigation.
            $section.parent().children(".collabo:not(.back)")
                .attr({ "aria-hidden": "true", inert: "" })
                .find("[id]").removeAttr("id");
        });
    }
});
