$(document).ready(function () {

  // fixed menu
  let heightHeader = $('.header').height();
  $(window).scroll(function () {
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
  $('.menu__btn').on('click', function () {
    $(this).toggleClass('open');
    $('.menu__content').toggleClass('open');
    $('.header').toggleClass('open');
    $('body').toggleClass('overflow');
  });

  // accordion
  $('.accordion>li>div').click(function () {
    $(this).toggleClass('open');
    $(this).next('article').slideToggle();
    $(this).closest('li').siblings('li').find('.accordion__title').removeClass('open');
    $(this).closest('li').siblings('li').find('article').slideUp();
  });

  //style input
  let inputsStyleLabel = $(".form-group input, .form-group textarea");

  inputsStyleLabel.on('focus', function () {
    let self = $(this);
    self.prev().addClass('active');
  });

  inputsStyleLabel.on('focusout', function () {
        let self = $(this);
    self.val() == "" ? self.prev().removeClass('active') : "";
  });


  if ($("#curve").length === 1) { animateScroll()};
  function animateScroll() {
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
  };


  // animate circle 
  $(window).scroll(function(){
    $('circle').each(function(){
      if(isScrolledIntoView($(this))){
        $(this).addClass('animate');
      }
      else{
        $(this).removeClass('animate');
      }
    });
  });
  
  function isScrolledIntoView(elem){
      let element = $(elem);
      let screen = $(window);
      let docViewTop = screen.scrollTop();
      let docViewBottom = docViewTop + screen.height();
      let elemTop = element.offset().top;
      let elemBottom = elemTop + element.height();
      return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
  }

});
