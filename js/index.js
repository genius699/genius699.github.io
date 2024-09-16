
// LOADER
paceOptions = {
    ajax: true,
    document: true,
    eventLag: false
};

Pace.on('done', function () {
    gsap.to('.p', 1, {
        opacity: 0,
        y: '-15%',
        stagger: -.1,
    })

    gsap.to('#preloader', 1.5, {
        y: '-100%',
        ease: 'Expo.easeInOut',
        delay: 1,
        onComplete: function () {

            //ALL THE ANIMATIONS THAT WILL TAKE PLACE AFTER THE PAGE IS LOADED

            $('.text').each(function () {
                $(this).delay(1200).addClass('reveal')
            })
            $('.img').each(function () {
                $(this).delay(1200).addClass('reveal')
            })

            if (document.querySelector('#index-two') || document.querySelector('#index-one')) {
                gsap.to('.new-release', 0, { opacity: 1 })
                $('.new-release').delay(2000).addClass('opacity');
            }

            if (document.querySelector('.fade-in')) {
                gsap.to('.fade-in', 1, { delay: 1, opacity: 1, stagger: .4 })
            }


            if (document.querySelector('.opacity-contact')) {

                gsap.to('.opacity-contact', 1, { delay: 1, opacity: 1, stagger: .4 })

            }

            $('.menu-bar-line').delay(2000).addClass('opacity');


            //ALL THE ANIMATIONS THAT WILL TAKE PLACE WHILE SCROLLING
            $(function () {
                var elements = $(".text-scroll, .img-scroll").toArray();
                $(window).scroll(function () {
                    elements.forEach(function (item) {
                        if ($(this).scrollTop() >= $(item).offset().top - window.innerHeight) {
                            $(item).addClass("reveal");
                        }
                    });
                });
                elements.forEach(function (item) {
                    if ($(this).scrollTop() >= $(item).offset().top - window.innerHeight) {
                        $(item).addClass("reveal");
                    }
                });
            });

            //animation for songs page
            if (document.querySelector('.fade-up')) {
                gsap.to('.fade-up', 1, { opacity: 1, y: 0, delay: 1, stagger: .1 })
            }

            if (document.querySelector('.music-indicator')) {
                gsap.to('.music-indicator', 1, { opacity: 1, delay: 1 })
            }
            if (document.querySelector('.scale')) {
                gsap.to('.scale', 1, { opacity: 1, delay: 1, scale: 1, stagger: .2 })
            }

        }
    })
});


// SCROLL PROGRESS ANIMATION

$(window).scroll(function () {
    var scroll = $(window).scrollTop(),
        dh = $(document).height(),
        wh = $(window).height();
    scrollPercent = (scroll / (dh - wh)) * 100;
    $(".progressbar").css("height", scrollPercent + "%");
});



$(function () {
    var $cursor = $('.cursor');
    var $cursortwo = $('.cursor-two')
    function cursormover(e) {

        gsap.to($cursor, {
            x: e.clientX,
            y: e.clientY,
        })
        gsap.to($cursortwo, {
            x: e.clientX,
            y: e.clientY,
        })
    }
    function cursorhover(e) {
        gsap.to($cursor, {
            scale: 1.5,
            opacity: .4,
            background: 'rgb(235,235,235)',
            border: 'none',
            ease: Expo.easeOut,
        })
        gsap.to($cursortwo, {
            scale: 0,
            opacity: 0
        })
    }
    function cursor(e) {
        gsap.to($cursor, {
            scale: 1,
            opacity: 1,
            background: 'transparent',
            border: '1px solid rgb(235,235,235)',
            innerHTML: ''
        })
        gsap.to($cursortwo, {
            scale: 1,
            opacity: 1
        })
    }
    $(window).on('mousemove', cursormover);
    $('a').hover(cursorhover, cursor);
    $('.hover').hover(cursorhover, cursor);
    $('.mouse').hover(cursorhover, cursor);

})

