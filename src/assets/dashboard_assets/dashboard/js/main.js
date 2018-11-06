$(document).ready(function () {
  $(window).bind('scroll', function () {
    if ($(window).width() < 960) {
      var navHeight = $(".main-header").height() + $('.content-header').height() + $('.doc_back').height() + $('.mnav').height();
      $(".content-header").height();
      $(".doc_back").height();
      ($(window).scrollTop() > navHeight) ? $('.navi2').addClass('goToTop') : $('.navi2').removeClass('goToTop');
      ($(window).scrollTop() > navHeight) ? $('.pad_sec').addClass('pad_sec2') : $('.pad_sec').removeClass('pad_sec2');
    }
    else {
      ('More than 960');
      var navHeight = $(".main-header").height() + $('.content-header').height() + $('.doc_back').height();
      $(".content-header").height();
      $(".doc_back").height();
      ($(window).scrollTop() > navHeight) ? $('.navi2').addClass('goToTop') : $('.navi2').removeClass('goToTop');
      ($(window).scrollTop() > navHeight) ? $('.pad_sec').addClass('pad_sec2') : $('.pad_sec').removeClass('pad_sec2');
    }


  });
});
