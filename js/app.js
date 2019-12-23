$(function() {

    const worksSlider = $('[data-slider="slick"]');

    /* Fixed Header
    ======================================================== */
    let header = $('#header'),
    introH = $("#intro").innerHeight(), // Возвращает высоту элемента, включая внутренние отступы, в пикселях
    scrollOffset = $(window).scrollTop(); // Получает значение отступа прокрутки сверху для первого элемента в наборе

    checkScroll(scrollOffset);

    $(window).on("scroll", function() {
        scrollOffset = $(this).scrollTop();

        checkScroll(scrollOffset);
    });


    function checkScroll(scrollOffset) {
        if( scrollOffset >= introH) {
            header.addClass("fixed");
        } else {
            header.removeClass("fixed");
        }
    }

    /* Smooth scroll
    ======================================================== */
    $("[data-scroll]").on("click", function(event) {
        event.preventDefault();

        let $this = $(this),
            blockId = $this.data('scroll'),
            blockOffset = ($(blockId).offset().top) - 100;

        $("#nav a").removeClass("active");
        $this.addClass("active");
        $('#nav').removeClass('show');

        $("html, body").animate({
           scrollTop: blockOffset
        }, 500);
    });


    /* Filter
    ======================================================== */
    let filter = $("[data-filter]");

    filter.on("click", function(event) {
        event.preventDefault();

        let cat = $(this).data('filter');

        $("[data-cat]").each(function() {

            let workCat = $(this).data('cat');

            if(workCat != cat) {
                $(this).addClass('hide');
            } else {
                $(this).removeClass('hide');
            }
        });
        
        if(cat == 'all' && $("[data-cat]").hasClass('hide')) {
            $("[data-cat]").removeClass('hide');
        } 
    });

    /* Modal
    ======================================================== */

    const modalCall = $('[data-modal]');
    const modalClose = $('[data-close]');

    modalCall.on('click', function(event) {
        event.preventDefault();

        let $this = $(this);
        let modalId = $this.data('modal');

        $(modalId).addClass('show');
        $('body').addClass('no-scroll');

        worksSlider.slick('setPosition');
    });

    modalClose.on('click', function(event) {
        event.preventDefault();

        let $this = $(this);
        let modalParent = $this.parents('.modal');

        modalParent.removeClass('show');
        $('body').removeClass('no-scroll');
    });

    $('.modal').on('click', function(event) {
        $(this).removeClass('show');
        $('body').removeClass('no-scroll');
    });

    $('.modal__dialog').on('click', function(event) {
        event.stopPropagation();
    });

    /* Slider: https://kenwheeler.github.io/slick/
    ======================================================== */

    worksSlider.slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        arrows: false,
        dots: true
    });

    $(".slickPrev").on("click", function(event) {
        event.preventDefault();

        let currentSlider = $(this).parents('.modal').find('[data-slider="slick"]');

        currentSlider.slick("slickPrev");
    });

    $(".slickNext").on("click", function(event) {
        event.preventDefault();

        let currentSlider = $(this).parents('.modal').find('[data-slider="slick"]');

        currentSlider.slick("slickNext");
    });

    /* Mobile nav
    ======================================================== */

    const navToggle = $('#navToggle');
    const nav = $('#nav');

    navToggle.on('click', function(event) {
        event.preventDefault();
        
        nav.toggleClass('show');
    })

});