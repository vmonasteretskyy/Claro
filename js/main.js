$(document).ready(function () {

  //fixed menu
  let heightHeader = $('.header').height();
  $(window).scroll(() => {
    let currentPosition = $(window).scrollTop();

    if (currentPosition >= heightHeader) {
      $('.header').addClass('fixed').removeClass('visible');
      $('main').css('padding-top', heightHeader);
    }

    if (currentPosition < this.previousPosition) {
      $('header').addClass('visible');
    }

    if (currentPosition < heightHeader) {
      $('.header').removeClass('visible fixed');
      $('main').css('padding-top', "0");
    }

    this.previousPosition = currentPosition;
  });


  $('.menu__items>span').click(function () {
    $(this).next('ul').slideToggle();
    $(this).closest('li').siblings('li').find('ul').slideUp();
  })
  $(document.body).click(function (e) {
    $('.menu__items>span').next('ul').slideUp();
  });

  $(".menu__items>span").click(function (e) {
    e.stopPropagation();
  });

  // menu on screen 1200
  $('.menu__btn').on('click', function() {
		$(this).toggleClass('open');
    $('.menu__content').toggleClass('open');
    $('.header').toggleClass('open');    
    $('body').toggleClass('overflow');
	});



  (function () {
    // Variables
    let $curve = document.getElementById("curve");
    let last_known_scroll_position = 0;
    let defaultCurveValue = 380;
    let curveRate = 7;
    let ticking = false;
    let curveValue;
    // Handle the functionality
    function scrollEvent(scrollPos) {
      if (scrollPos >= 0 && scrollPos < defaultCurveValue) {
        curveValue = defaultCurveValue - parseFloat(scrollPos / curveRate);
        $curve.setAttribute(
          "d",
          "M 800 380 Q 380 " + curveValue + " 0 380 L 0 0 L 800 0 L 800 380 Z"
        );
      }
    }
    // Scroll Listener
    window.addEventListener("scroll", function (e) {
      last_known_scroll_position = window.scrollY;
      if (!ticking) {
        window.requestAnimationFrame(function () {
          scrollEvent(last_known_scroll_position);
          ticking = false;
        });
      }
      ticking = true;
    });
  })();

});
