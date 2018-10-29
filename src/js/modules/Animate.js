import { TimelineMax } from 'gsap';
import '../_lib/MorphSVGPlugin';

function Animate() {
    const h = new TimelineMax();

    h
        .fromTo('.title__border', 0.3, { height: 0 }, { height: '45%' }, '1')
        .fromTo('.title__text', 0.7, { x: -50, opacity: 0 }, { x: 0, opacity: 1 })
        .fromTo('.hero__desc', 0.5, { x: -100, opacity: 0 }, { x: 0, opacity: 1 })
        .fromTo('.hero__btn', 0.5, { x: -100, opacity: 0 }, { x: 0, opacity: 1 }, '-=.3')
        .fromTo('.hero .info-text', 0.5, { x: -100, opacity: 0 }, { x: 0, opacity: 1 }, '-=.3')
        .fromTo('.hero .img-container__bg', 0.6, { scale: 1.2, opacity: 0 }, { scale: 1, opacity: 1 }, '-=1.2')
        .fromTo('.hero__slide', 0.6, { scale: 1.2, opacity: 0 }, { scale: 1, opacity: 1 }, '-=.7')
        .fromTo('.hero__link', 0.5, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1 }, '-=.4')
        .fromTo('.box-icon-move__icon', 0.5, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1 }, '-=.5')
        .staggerTo('.box-icon-move__icon', 1, {rotationY: 360});

    // var path = MorphSVGPlugin.pathDataToBezier('#motionPath');

    // let w = new TimelineMax();
    // w
    //     .to('#one', 8, { bezier: { values: path.reverse(), type: 'cubic' }, ease: Circ.easeOut, repeat: 0, }).progress(1.1)
    //     .to('#two', 8, { bezier: { values: path, type: 'cubic' }, ease: Circ.easeOut, repeat: 0, })
    //     .to('#three', 8, { bezier: { values: path, type: 'cubic' }, ease: Circ.easeOut, repeat: 0, });

    const i = new TimelineMax();
    i
        .set('.info .img-container__bg', { x: '-100%', opacity: 0 })
        .set('.info-block__title', { x: 100, opacity: 0 })
        .set('.main__title', { opacity: 0, x: 180 })
        .set('.info .img-container__img', { x: '-120%', opacity: 0 })
        .set('.info .info-block__item, .info .info-text, .info .tab-bot__btn', { x: 100, opacity: 0 });


    const r = new TimelineMax();
    r
        .set('.result-photo__item', { y: 200, opacity: 0 })
        .set('.results-anim-block', { y: 50, opacity: 0 });

    const v = new TimelineMax();
    v
        .set('.video__title', { y: 200, opacity: 0 })
        .set('.bals__item', { y: 500, zIndex: 10 })
        .set('.bals__item--2', { x: -50 })
        .set('.video__desc', { y: 50, opacity: 0 })
        .set('.video__player', { scale: 1.2, opacity: 0 })
        .set('.video__play', { scale: 0, opacity: 0 })
        .set('.video__btn', { y: 100, opacity: 0 });

    const c = new TimelineMax();
    c
        .set('.counter-user', { y: 50, opacity: 0 })
        .set('.counter__desc', { y: 70, opacity: 0 });

    const p = new TimelineMax();
    p
        .set('.price__title, .price__desc', { y: 30, opacity: 0 })
        .set('.price__item', {
            x: -300, opacity: 0, transition: 'initial'
        });

    window.onscroll = function() {
        let scroll = document.documentElement.scrollTop;
        let destination = 300;
        if ($('.info').offset().top - destination < scroll) {
            i
                .to('.info .img-container__bg', 0.8, { x: 0, xPercent: -51, opacity: 1 })
                .to('.info-block__title', 0.8, { x: 0, opacity: 1 }, '-=.5')
                .to('.info .img-container__img', 0.8, { x: 0, xPercent: -51, opacity: 1 }, '-= .2')
                .staggerTo('.info .info-block__item', 0.9, { x: 0, opacity: 1 }, 0.4, '-=.8')
                .to('.info .info-text', 0.8, { x: 0, opacity: 1 }, '-= .3')
                .to('.info .tab-bot__btn', 0.8, { x: 0, opacity: 1 }, '-=.3');
        }

        if ($('.results').offset().top - destination < scroll) {
            r
                .staggerTo('.result-photo__item', 0.8, { y: 0, opacity: 1 }, 0.3)
                .staggerTo('.results-anim-block', 0.8, { y: 0, opacity: 1 }, 0.5, '-=1.5');
        }

        if ($('.video').offset().top - destination < scroll) {
            v
                .to('.video__title', 0.8, { ease: Expo.easeOut, y: 0, opacity: 1 })
                .staggerTo('.bals__item', 0.8,
                    { ease: Expo.easeOut, y: 0, zIndex: 1 }, 0.5)
                .to('.bals__item--2', 1, { x: 0 }, '-=1')
                .to('.bals__item--3', 1, { x: 50, y: 10 }, '-=1')
                .to('.video__desc', 0.5, { y: 0, opacity: 1 }, '-=.5')
                .to('.video__player', 0.8, { scale: 1, opacity: 1 }, '-=1.5')
                .to('.video__play', 1, {
                    ease: Elastic.easeOut.config(1, 0.3),
                    scale: 1,
                    opacity: 1
                }, '-=1')
                .to('.video__btn', 0.9, { y: 0, opacity: 1 }, '-=.3');
        }

        if ($('.counter').offset().top - destination < scroll) {
            c
                .to('.counter-user', 0.8, { y: 0, opacity: 1 })
                .to('.counter__desc', 0.8, { y: 0, opacity: 1 }, '-=.7');
        }

        if ($('.price').offset().top - destination < scroll) {
            p
                .to('.price__title', 0.8, { y: 0, opacity: 1 })
                .to('.price__desc', 0.8, { y: 0, opacity: 1 }, '-=.3')
                .staggerTo('.price__item', 0.7, {
                    x: 0,
                    opacity: 1
                }, 0.5, '-=.5')
                .to('.price__item', 0.5, {
                    onComplete: function() {
                        $('.price__item').css('transition', '.35s');
                    }
                });

        }
    };
}; export default Animate;
