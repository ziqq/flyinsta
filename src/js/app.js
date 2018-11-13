import './_lib/jquery-migrate.min';
import './assets/svg-sprite';
import svg4everybody from 'svg4everybody';
import fancyBox from '@fancyapps/fancybox';
import './_lib/slick';
import './_lib/scrollspy';
import 'bootstrap/js/dist/util';
import 'bootstrap/js/dist/modal';
import sectionAnimate from './modules/Animate';

$(function() {
    $('body').removeClass('loading');

    if ($(window).width() > 1024 && $(window).height() <= 1080) {
        sectionAnimate();
    }

    function heroHeight() {
        if ($(window).height() > 1080) {
            if ($(window).width() > 1024) {
                $('.hero').css({
                    minHeight: 100 + '%'
                });
            } else {
                $('.hero').css({
                    minHeight: 100 + '%',
                    paddingTop: 120 + 'px'
                });
            }
        }
    }
    heroHeight();
    $(window).resize(heroHeight());

    $('.js-tabs').each(function() {
        let $tab = $(this).find('.tab__title');
        let $content = $(this).find('.tab__content');
        let $btnPrev = $(this).find('.tab__btn--prev');
        let $btnNext = $(this).find('.tab__btn--next');
        let i = 0;

        if ($(window).width() >= 480) {
            $content.not(':first').hide();

            $tab.on('click', function() {
                $tab.removeClass('is-active')
                    .eq($(this).index())
                    .addClass('is-active');
                $content
                    .hide()
                    .eq($(this).index())
                    .fadeIn();
            })
                .eq(0)
                .addClass('is-active');
        } else {
            $content.not(':first').hide();
            $tab.not(':first').hide();

            $btnPrev.on('click', prev);

            $btnNext.on('click', next);

            function prev() {
                $tab.hide();
                $content.hide();
                i--;
                if (i < 0) {
                    i = $tab.length - 1;
                }
                $tab.eq(i).fadeIn();
                $content.eq(i).fadeIn();
            }

            function next() {
                $tab.hide();
                $content.hide();
                i++;
                if (i >= $tab.length) {
                    i = 0;
                }
                $tab.eq(i).fadeIn();
                $content.eq(i).fadeIn();
            }
        }
    });

    $('.menu li').on('click', function() {
        // $('.menu li').removeClass('is-active');
        // $(this).addClass('is-active');
        $('.wrapper').removeClass('menu-open');
        $('.js-hamburger').removeClass('on');
    });

    //Hamburger
    $('.js-hamburger').on('click', function(e) {
        if ($(this).hasClass('on')) {
            $(this).removeClass('on');
            $('.wrapper').removeClass('menu-open');
        } else {
            $(this).addClass('on');
            $('.wrapper').addClass('menu-open');
        }
        if ($('.hero').find('.slick-slide').length) {
            let img = $('.hero')
                .find('.slick-slide.slick-active')
                .find('picture source')
                .attr('srcset');
            $('.js-menu')
                .find('.menu__list')
                .css('background-image', 'url(' + img + ')');
        } else {
            let img = $('.hero')
                .find('picture source')
                .attr('srcset');
            $('.js-menu')
                .find('.menu__list')
                .css('background-image', 'url(' + img + ')');
        }
        e.preventDefault();
    });

    //Slider
    $('.js-slider').each(function() {
        let $slids = $(this).find('.slider__slides');
        let $slide = $(this).find('.slider__slide');

        if ($slide.length > 1) {
            $slids.not('.slick-initialized').slick({
                autoplay: true,
                autoplaySpeed: 3000,
                speed: 1500,
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: true,
                arrows: false,
                dots: false,
                fade: true,
                cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)',
                responsive: [
                    {
                        breakpoint: 480,
                        settings: {
                            fade: false
                        }
                    }
                ]
            });
        }
    });

    if ($(window).width() > 480) {
        $('.js-line').each(function() {
            $('<li>')
                .addClass('line')
                .appendTo($(this));

            let $li = $(this).find('li');

            let $line = $(this).find('.line');

            $li.each(function() {
                if ($(this).hasClass('is-active')) {
                    let width = $(this).width();
                    let howFar = $(this).position().left;
                    $line.css({
                        left: howFar + 'px',
                        width: width
                    });
                }
            });

            $li.on('click', function() {
                if ($(this).hasClass('line')) {
                    return;
                }

                let width = $(this).width();
                let howFar = $(this).position().left;

                $line.css({
                    left: howFar + 'px',
                    width: width
                });
            });
        });
    }

    //Window on scroll header fix
    $(window).scroll(function() {
        let scroll = $(this).scrollTop();
        if (scroll > 0) {
            $('.header').addClass('is-fixed');
        } else {
            let $menuItem = $('.js-menu').find('.menu__item');
            $('.header').removeClass('is-fixed');
            $menuItem.removeClass('is-active');
        }

        if (scroll > $(window).height()) {
            $('.js-go-top').addClass('is-visible');
        } else {
            $('.js-go-top').removeClass('is-visible');
        }
    });

    //Btn pulse
    $('.js-btn-pulse').on('mousedown', function() {
        $(this).addClass('is-clicked');
        setTimeout(() => {
            $(this).removeClass('is-clicked');
        }, 1000);
    });

    //Scroll To
    $('.js-goto').on('click', function(e) {
        e.preventDefault();

        let offset;
        if ($(window).width() > 480) {
            offset = 50;
        } else {
            offset = 70;
        }
        let el = $(this).attr('href');
        let destination = $(el).offset().top;
        $('html, body').animate(
            { scrollTop: destination - offset + 'px' },
            400
        );
    });

    $('.js-go-next').on('click', function(e) {
        let target = $(this)
            .closest('section')
            .next('section')
            .offset().top;

        let offset;
        if ($(window).width() > 480) {
            offset = 50;
        } else {
            offset = 70;
        }
        $('html, body').animate({ scrollTop: target - offset }, 'slow');
        e.preventDefault();
    });

    let scrollspyOffset;
    if ($(window).height() <= 1080) {
        scrollspyOffset = -100;
    } else {
        scrollspyOffset = -400;
    }
    if ($(window).width() >= 480) {
        $('.js-scrollspy').scrollspy({ offset: scrollspyOffset });
    }

    $('.js-go-top').on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: 0 }, 800);
    });

    if ($('.js-input').length) {
        $('.js-input')
            .find('input')
            .on('focus', function() {
                $(this)
                    .parent('.js-input')
                    .addClass('is-focus');
            })
            .on('blur', function() {
                if ($(this).val() === '') {
                    $(this)
                        .parent('.js-input')
                        .removeClass('is-focus');
                }
            });
    }
});
