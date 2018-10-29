function App() {
    (this.init = function() {
        if ($(window).width() >= 768) {
            $('body').addClass('js-enabled');
            $('#flyinsta').fullpage();
        }
        this.popup();
    }),
    (this.popup = function() {
        //Modal FancyBox 3 https://fancyapps.com/fancybox/3/
        if ($('[data-fancybox]').length) {
            $('[data-fancybox]').fancybox({
                closeClickOutside: true,
                autoFocus: false,
                image: {
                    preload: true
                },
                helpers: {
                    overlay: {
                        locked: false
                    }
                }
            });
        }
    });
}

export default App;
