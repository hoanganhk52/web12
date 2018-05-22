$(document).ready(function () {
    $('.back-to-top').fadeOut();

    $('.share').on('click', function (e) {
        console.log('asdasd');
        e.preventDefault();
        $('#popup').toggleClass('show');
    });

    $(window).scroll(function(){
        console.log('dfdsf');
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn();
        } else {
            $('.back-to-top').fadeOut();
        }
    });

    $('.back-to-top').on('click', function (e) {
        $("html, body").animate({ scrollTop: 0 }, 600);
        return false;
    });

});