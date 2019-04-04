$(document).ready(function () {

  // fixed menu
  let heightHeader = $('.header').height();
  $(window).scroll(function () {
    let currentPosition = $(window).scrollTop();

    if (currentPosition >= heightHeader) {
      $('.header').addClass('fixed').removeClass('visible');
      $('main').css('padding-top', heightHeader);
    }else {
      $('.header').removeClass('fixed');
      $('main').css('padding-top', '0');
    }

    // if (currentPosition < this.previousPosition) {
    //   $('header').addClass('visible');
    // }

    // if (currentPosition < heightHeader) {
    //   $('.header').removeClass('visible fixed');
    //   $('main').css('padding-top', '0');
    // }

    // this.previousPosition = currentPosition;
  });


  $('.menu__items>span').click(function () {
    $(this).next('ul').slideToggle();
    $(this).closest('li').siblings('li').find('ul').slideUp();
  })
  $(document.body).click(function (e) {
    $('.menu__items>span').next('ul').slideUp();
  });

  $('.menu__items>span').click(function (e) {
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


  //input style
  let inputsStyleLabel = $('.form-group input');
  inputsStyleLabel.on('focus', function () {
    $(this).prev().addClass('active');
  });

  inputsStyleLabel.on('focusout', function () {
    if($(this).val() == " ") $(this).prev().removeClass('active');
  });


  $('.contact-us-form-send').submit(function (e) {
    let ths = $(this);
    e.preventDefault();
    let messageLength = $('#messageText').val().length;
    if (messageLength === 0) {
      $('#messageText').parent().addClass('error');
      return;
    }

    
   
    let serialize = $(ths).serialize();


    $.ajax({
      url: "/mail.php",
      dataType: "JSON",
      type: "POST",
      data: serialize,
      beforeSend: function(){
        $(ths).find('.send-message').html('<span class="loader"></span>');
      },
      success: function(data){
        console.log(data);
        $(ths).find('.send-message').html('Send');
        if(data.type == 0){
          $('.result-ajax').html('<span style="color: red;">'+data.message+'</span>');
        } 
        if(data.type == 200){
          $(ths).html('<span style="color: green;">'+data.message+'</span>');
        }
      },
      error: function(errr){
        $(ths).find('.send-message').html('Send');

        console.log(errr);
      }
    });




  });

  $('#messageText').focus(function () {
    $('#messageText').parent().removeClass('error');
  })


  if ($('#curve').length === 1) animateScroll();

  function animateScroll() {
    let last_known_scroll_position = 0;
    let defaultCurveValue = 380;
    let curveRate = 6;
    let ticking = false;
    let curveValue;
    
    function scrollEvent(scrollPos) {
      if (scrollPos >= 0 && scrollPos < defaultCurveValue) {
        curveValue = defaultCurveValue - parseFloat(scrollPos / curveRate);
        $('#curve')[0].setAttribute(
          "d",
          "M 800 380 Q 380 " + curveValue + " 0 380 L 0 0 L 800 0 L 800 380 Z"
        );
      }
    }
   
    window.addEventListener('scroll', function () {
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
  $(window).scroll(function () {
    $('circle').each(function () {
      if (isScrolledIntoView($(this))) {
        $(this).addClass('animate');
      }
    });
  });

  function isScrolledIntoView(elem) {
    let element = $(elem);
    let screen = $(window);
    let docViewTop = screen.scrollTop();
    let docViewBottom = docViewTop + screen.height();
    let elemTop = element.offset().top;
    let elemBottom = elemTop + element.height();
    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
  }

});







  var onloadCallback = function() {
    alert("grecaptcha is ready!");
  };