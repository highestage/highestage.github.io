$(function(){
  if( $('.comparison').length ) {
    function comparison() {
      for( var i = 0, l = $('.comparison').length; i < l; i++ ) {
        if( $(document).scrollTop() + $(window).height() > $('.comparison').eq(i).offset().top + (($('.comparison').eq(i).outerHeight() / 4) * 3) ) {
          var $artwork = $('.comparison').eq(i).find('.comparison__artwork')
          $artwork.addClass('is-active');
          setTimeout(() => {
            $artwork.addClass('is-finished').next('input').addClass('is-finished');
          }, 6500);
        }
      }
      if( $('.comparison__artwork:not(.is-active)').length ) {
        window.requestAnimationFrame( comparison );
      }
    }
    comparison();

    $('.comparison__range').on('input change', function(){
      var $el = $(this);
      var $artwork = $el.closest('.comparison').find('.comparison__artwork');
      if( !$artwork.attr('style') ) {
        $artwork.css({
          'animation': 'none'
        })
      }
      $artwork.width( 100 - $el.val() + '%' );
    });
  }

  $('.hero__cta').on('click', function(){
    var $modal = $('.modal.is-beta');

    $modal.addClass('is-active');
    setTimeout(function(){
      $modal.addClass('is-animated');
      $modal.find('.modal__content').addClass('is-active');
      $modal.find('.modal__close').addClass('is-active');
    }, 100);

    return false;
  });
  $('.modal__close').on('click', function(){
    $('.modal__content').removeClass('is-active');
    $('.modal__close').removeClass('is-active');
    setTimeout(function(){
      $('.modal').removeClass('is-active');
      setTimeout(function(){
        $('.modal').removeClass('is-animated');

        if( $('.notify').length ) {
          $('.notify__content').removeClass('is-invisible');
          $('.notify__thankyou').removeClass('is-visible');
        }
      }, 100);
    }, 100);
  });

  $(document).keyup(function(e) {
    if (e.keyCode === 27 && $('.modal').length) {
      $('.modal__close').triggerHandler('click');
    }
  });


  var emailCheck = function(email) {
    var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if(!regex.test(email)) {
        return false;
    }else{
        return email;
    }
  }
  var $notifyForm;
  $('.notify__submit').on('click', function(){
    $notifyForm = $(this).closest('.notify__form');
    var email = $notifyForm.find('.notify__email').val();
    var app = 'mossaik-photo';
    var notificationType = ( $(this).closest('.modal').hasClass('is-beta') ? 'beta' : 'newsletter');

    var check = emailCheck(email);

    if( check != false ) {
      subscribe( email, app, notificationType );
    } else {
      $notifyForm.find('.notify__email').addClass('is-false');
      setTimeout(function(){
        $notifyForm.find('.notify__email').removeClass('is-false');
      }, 550);
    }

    return false;
  });
  var showThankYou = function(){
    var $notifyBlock = $notifyForm.closest('.notify');
    $('.modal__content').removeClass('is-active');
    setTimeout(function(){
      $notifyBlock.find('.notify__content').addClass('is-invisible');
      $notifyBlock.find('.notify__thankyou').addClass('is-visible');
      $notifyBlock.find('.notify__email').val('').blur();
      
      setTimeout(function(){
        $('.modal__content').addClass('is-active');
      }, 150);
    }, 350);
  };
  var subscribe = function( email, app, notificationType ) {
    showThankYou();
    var url;
    referral = 'notify-block';
    if( notificationType == 'beta' ) {
      url = "/subscribtions/mossaik-photo/subscribe.php";
    } else {
      url = "/subscribtions/mossaik-photo/subscribe.php";
    }
    $.ajax({
        method: "POST",
        url: url,
        data: "email=" + email + "&referral=" + referral,
        success: function(data) {}
    });
  };

  function autoPlayVideo() {
    if( $('.art__video').offset().top + $('.art__video').height() / 3 * 2 <= $(document).scrollTop() + $(window).height() ) {
      $('.art__video')[0].play();
      setTimeout(function(){
        window.requestAnimationFrame(function(){$('.replay').addClass('is-active')});
      }, 4000);
    } else {
      window.requestAnimationFrame( autoPlayVideo );
    }
  }

  $('.replay').on('click', function(){
    $('.art__video')[0].play();
    $('.replay').removeClass('is-active');
    setTimeout(function(){
      window.requestAnimationFrame(function(){$('.replay').addClass('is-active')});
    }, 4000);
  });

  // let tmpImg = new Image(),
  //     imgSrc;
  // imgSrc = ( $('html').hasClass('retina') ? $('.hero .art__image').attr('srcset').split(',')[1].replace(' 2x', '') : $('.hero .art__image').attr('srcset').split(',')[0].replace(' 1x', ''));
  // tmpImg.src = imgSrc;
  // tmpImg.onload = function() {
  //   $('.hero').addClass('is-active');

  //   setTimeout(() => {
  //     $('.section').addClass('is-active');

  //     setTimeout(() => {
  //       $('.section').addClass('is-visible'); 
  //       animateSections(); 
  //       compare();
  //       if( $('.art__video').length ) {
  //         autoPlayVideo();
  //       }
  //     }, 60);

  //   }, 700);
  // }

  // - //
  setTimeout(() => {
    $('.hero20__mainArtwork').addClass('is-active');

    setTimeout(() => {
      $('.section').addClass('is-active');

      setTimeout(() => {
        $('.section').addClass('is-visible'); 
        animateSections(); 
        compare();
        if( $('.art__video').length ) {
          autoPlayVideo();
        }
      }, 60);

    }, 700);
  }, 500);
  // - //

  const animateSections = () => {
    for( let i = 0, l = $('.section').length; i < l; i++ ) {
      if ( $(document).scrollTop() + (($(window).height() / 4) * 3) >= $('.section').eq(i).offset().top && !$('.section').eq(i).hasClass('is-animated') ) {
        $('.section').eq(i).addClass('is-animated');
      }
    }
    if( $('.section.is-animated').length != $('.section').length ) {
      window.requestAnimationFrame( animateSections );
    }
    if ( $(document).scrollTop() + (($(window).height() / 4) * 3) >= $('.whats-new').offset().top && !$('whats-new').hasClass('is-animated') ) {
      $('.whats-new').addClass('is-animated');
    }
    if ( $(document).scrollTop() + (($(window).height() / 4) * 3) >= $('.hero20__mainInfoContent').offset().top && !$('.hero20__mainInfoContent').hasClass('is-animated') ) {
      $('.hero20__mainInfoContent').addClass('is-animated');
    }
    if ( $(document).scrollTop() + (($(window).height() / 2)) >= $('.hero20__features').offset().top && !$('.hero20__features').hasClass('is-animated') ) {
      $('.hero20__features').addClass('is-animated');
    }
  }

  const compare = () => {
    for( var i = 0, l = $('.ml-compare').length; i < l; i++ ) {
      if( $(document).scrollTop() + $(window).height() > $('.ml-compare').eq(i).offset().top + (($('.ml-compare').eq(i).outerHeight() / 4) * 3) ) {
        var $artwork = $('.ml-compare').eq(i).find('.ml-compare__block')
        $artwork.addClass('is-active');
        setTimeout(() => {
          $artwork.addClass('is-finished');
          $('.ml-compare__range').addClass('is-finished');
        }, 6500);
      }
    }
    if( $('.ml-compare__block:not(.is-active)').length ) {
      window.requestAnimationFrame( compare );
    }
  }
  if( $('.ml-compare').length ) {
    $('.ml-compare__range').on('input change', function(){
      var $el = $(this);
      var $artwork = $el.closest('.ml-compare').find('.ml-compare__block');
      if( !$artwork.attr('style') ) {
        $artwork.css({
          'animation': 'none'
        })
      }
      let diff = parseInt( ($el.val() / 100) * 14 );
      if( diff == 0 ) diff = 0.001;
      let val = parseInt( $el.val() - diff );

      $artwork.width( 100 - val + '%' );
    });
  }
  
  if( $('.presets').length ) {
    const presetsWrapper = $('.presets__wrapper');
    let presetsDotsItems = '';
    for(let i = 0, l = $('.presets__item').length; i < l; i++ ) {
      presetsDotsItems += `<li class="presets__dotsItem${i === 0 ? ' is-active' : ''}" data-index="${i}"></li>`;
    }
    const presetsDots = `<ul class="presets__dots">${presetsDotsItems}</ul>`;
    presetsWrapper.append( presetsDots );
  }
  let presetsArrowClicked = 0;
  if( presetsArrowClicked == 0 ) $('.presets__arrows-item[data-direction=prev]').addClass('is-invisible');
  let presetsStep,
      presetsDelta;
  if( $(window).width() < 768 ) {
    presetsStep = 1;
    presetsDelta = 1;
  } else {
    presetsStep = 2;
    presetsDelta = 0
  }
  $('.presets__arrows-item').on('click', function(){
    if( $(this).data('direction') === 'next'  && presetsArrowClicked < 9 + presetsDelta) {
      presetsArrowClicked = presetsArrowClicked + presetsStep;
      $('.presets__item').css('transform', 'translate(-' + presetsArrowClicked * 100 + '%)');
      if( presetsArrowClicked == 8 + presetsDelta ) $('.presets__arrows-item[data-direction=next]').addClass('is-invisible');
      $('.presets__arrows-item[data-direction=prev]').removeClass('is-invisible');
    }
    if( $(this).data('direction') === 'prev' && presetsArrowClicked > 0 ) {
      presetsArrowClicked = presetsArrowClicked - presetsStep;
      $('.presets__item').css('transform', 'translate(-' + presetsArrowClicked * 100 + '%)');
      if( presetsArrowClicked == 0 ) $('.presets__arrows-item[data-direction=prev]').addClass('is-invisible');
      $('.presets__arrows-item[data-direction=next]').removeClass('is-invisible');
    }
  });

  let startX,
      endX;

  const startSwipe = (e) => {
    let orig = e.originalEvent;
    startX = orig.changedTouches[0].pageX;
  };

  const stopSwipe = (e, $parent) => {
    let orig = e.originalEvent;
    endX = orig.changedTouches[0].pageX;

    let dist = endX - startX;
    let direction = '',
        swipe = false,
        $sliderNav = $('.presets__dots');

    if( dist > 30 ) {
      if( $('.presets__dotsItem.is-active').prev('.presets__dotsItem').length ) {
        direction = 'prev';
      } else {
        return false;
      }
      swipe = true;

    }
    if( dist < -30 ) {
      if( $('.presets__dotsItem.is-active').next('.presets__dotsItem').length ) {
        direction = 'next';
      } else {
        return false;
      }
      swipe = true;
    }

    if( swipe && direction != '' ) {
      $(`.presets__arrows-item[data-direction="${direction}"]`).triggerHandler('click');
      let pos;
      if( direction === 'prev' ) {
        pos = $('.presets__dotsItem.is-active').prev('.presets__dotsItem').index();
        $('.presets__dotsItem').removeClass('is-active');
        $('.presets__dotsItem').eq(pos).addClass('is-active');
      } else if( direction === 'next' ) {
        pos = $('.presets__dotsItem.is-active').next('.presets__dotsItem').index();
        $('.presets__dotsItem').removeClass('is-active');
        $('.presets__dotsItem').eq(pos).addClass('is-active');
      }

      swipe = false;
    }
  };

  $(document).on("touchstart", '.presets__list', function(e){
    let event = e;
    if( $(window).width() < 768 ) {
      startSwipe(event );
    }
  });

  $(document).on("touchend", '.presets__list', function(e){
    let event = e,
        $parent = $(this);
    if( $(window).width() < 768 ) {
      stopSwipe( event, $parent );
    }
  });




    $('.new-ml-compare__range').on('input change', function() {
      var $el = $(this);
      var $artwork = $el.closest('.new-ml-compare').find('.new-ml-compare__block');
      let diff = parseInt(($el.val() / 100) * 1);
      if (diff == 0) diff = 0.001;
      let val = parseInt($el.val());
      $artwork.width(100 - val + '%');
  });
  $('.new-ml-compare-original').on('click', function() {
      let $this = $(this);
      let $container = $(this).closest('.new-ml-compare');
      let index;
      if ($this.hasClass('is-active')) {
          index = 1;
      } else {
          index = 0;
      }
      $container.find('.new-ml-compare__original-wrapper').removeClass('is-active');
      $container.find('.new-ml-compare__original-wrapper[data-index="' + index + '"]').addClass('is-active');
      $this.find('svg').removeClass('is-active');
      $this.find('svg').eq(index).addClass('is-active');
      $this.toggleClass('is-active');
  });
  if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
      $('html').addClass('firefox');
  }
});