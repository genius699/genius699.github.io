
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

