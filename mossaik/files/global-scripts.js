(function( $ ){

  var scrollToSection = function( $ ) {
    'use strict';

    var $scrollBtn = $('.js-scrollTo'),
        $sectionToScrollTo = $('.js-section');

    var startActions = function() {
      $scrollBtn.on('click', function(){
        var scrollToName = $(this).data('for');

        var scrollToSectionOffset = $sectionToScrollTo.filter('[data-section="' + scrollToName + '"]').offset().top;

        window.requestAnimationFrame( scrollToSectionAnimation( scrollToSectionOffset ) );
      });
    };

    var scrollToSectionAnimation = function( scrollToSectionOffset ) {
      $('html, body').animate({
        scrollTop: scrollToSectionOffset
      }, 100 + Math.round(scrollToSectionOffset / 100) );
    };

    return {
      start: startActions
    }
  } (jQuery);

  var openModal = function ( $ ) {
    'use strict';

    var $modalLink = $('.js-modal-open');
    var startScroll;
    var vimeoPlayer;

    var $modalWindow = $('<section class="modal js-modal">\
                          <a class="modal__close js-modal-close"><svg xmlns="//www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" class="modal__close-icon"><defs><style>.cls-1{fill-rule: evenodd;}</style></defs><path id="Rectangle_1_copy" data-name="Rectangle 1 copy" class="cls-1" d="M23,21.3l-1.768,1.768L11.969,13.8,2.7,23.065,0.935,21.3,10.2,12.031,0.935,2.766,2.7,1l9.266,9.266L21.234,1,23,2.766l-9.266,9.266Z"/></svg>Close</a>\
                          <div class="modal__content js-modal-content"></div>\
                        </section>');

    var bindUIActions = function() {
      $modalLink.on('click', function(){
        var clickedButton = $(this);

        addModalWindow( $(this) );

        return false;
      });

      if( window.location.hash && $('.js-modal-open[data-name="' + window.location.hash.replace('#', '') + '"]').length ) {
        var hash = window.location.hash.replace('#', '');

        if( $('.js-modal-open[data-name="' + hash + '"]').length ) {
          addModalWindow( $('.js-modal-open[data-name="' + hash + '"]'), hash = true );
        } else {
          history.replaceState(null, null, window.location.pathname);
        }
      }
    };

    var addVideoHashTag = function( $clickedButton ) {
      var name = $clickedButton.data('name');
      if( name ) {
        history.replaceState(null, null, '#' + name);
      }
    };

    var addModalWindow = function( $clickedButton, hash ) {
      startScroll = $(document).scrollTop();
      $(document).scrollTop( 0 );
      $('body').prepend( $modalWindow );

      bindModalActions();

      var modalType = $clickedButton.data( 'type' );
      var source = $clickedButton.data( 'source' );

      if( modalType === 'video' ) {
        addVideoToModal( source, hash );
        addVideoHashTag( $clickedButton );
      } else if ( modalType === 'text' ) {
        addTextToModal( source );
      } else if ( modalType === 'image' ) {
        addImageToModal( source );
      } else if ( modalType === 'html-video' ) {
        addHTMLVideoToModal( source );
      }
    };

    var bindModalActions = function() {
      $('.js-modal-close').on('click', function(){
        removeModalWindow();
      });

      $(document).on("keyup", function(e){
        if(e.keyCode === 27 && $(".modal").length) {
          $('.js-modal-close').trigger('click');

          return false;
        }
      });
    };

    var removeModalWindow = function() {
      if( $('.video').length ) {
        $('.video').remove();
        vimeoPlayer = null;
        history.replaceState(null, null, window.location.pathname);
      }
      $('.js-modal-content').html('');
      $('.js-modal').removeClass('is-active');
      $('.js-modal-close').removeClass('is-active');
      $('.js-modal-content').removeClass('is-active');
      $('.js-modal').remove();
      $(document).scrollTop( startScroll );
    };

    var addTextToModal = function( source ) {
      $.ajax({
        type: 'POST',
        url: source,
        dataType: 'html',
        cache: false
      }).done(function(data){
        $('.js-modal-content').html('').prepend( data );

        $('.js-modal').addClass('is-active');
        $('.js-modal-close').addClass('is-active');
        $('.js-modal-content').addClass('is-active');
      });
    };

    var addImageToModal = function( source ) {
      var $img = '<div class="modal__image-wrapper"><img src="' + source + '" class="modal__image" /></div>';
      $('.js-modal-content').html('').prepend( $img );

      $('.js-modal').addClass('is-active');
      $('.js-modal-close').addClass('is-active');
      $('.js-modal-content').addClass('is-active');
    }

    var addHTMLVideoToModal = function( source ) {
      var $video = '<section class="html-video-wrapper">\
          <div class="html-video-block">\
            <video playsinline autoplay muted>\
              <source src="' + source + '" type="video/mp4">\
            </video>\
          </div>\
        </section>';

      $('.js-modal-content').html('').prepend( $video );

      $('.js-modal').addClass('is-active');
      $('.js-modal-close').addClass('is-active');
      $('.js-modal-content').addClass('is-active');

      $('video').on('ended',function(){
        setTimeout(function(){
          $('.js-modal').find('.js-modal-close').triggerHandler('click');
        }, 2000);
      });
    }

    var addVideoToModal = function( source, hash ) {
      var vimeoLink = source.replace('//vimeo.com/', '');

      var $video = $('<section class="video">\
                        <div class="video__container">\
                          <iframe class="video__frame" id="player_1" src="//player.vimeo.com/video/' + vimeoLink + '?' + (hash ? '' : 'autoplay=1&amp;') + '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>\
                        </div>\
                      </section>');

      $('.js-modal-content').prepend( $video );
      $('.js-modal').addClass('is-active');
      $('.js-modal-close').addClass('is-active');
      $('.js-modal-content').addClass('is-active');

      bindVideoActions( $video );
    };

    var bindVideoActions = function( $video ) {
      $('#player_1').on('load', function(){
        vimeoPlayer = new Vimeo.Player(document.querySelectorAll("iframe")[0]);
      });

      function ready(){
        vimeoPlayer.ready().on("finish", finish);
      };
      function finish(){
        // document.exitFullscreen = document.exitFullscreen || document.mozCancelFullScreen || document.webkitExitFullscreen || document.msExitFullscreen;

        // document.exitFullscreen();
        // setTimeout(function(){
        //   $(".js-modal-close").trigger("click");
        // }, 1000);
      };
    };

    var startModal = function() {
      bindUIActions();
    };

    return {
      start: startModal
    }
  } ( jQuery );

  $(function(){
    if( $('.js-scrollTo').length ) {
      scrollToSection.start();
    }
    if( $('.js-modal-open').length ) {
      openModal.start();
    }

    if( $('.feature__screenshot.is-repair-tool').length ) {
      var repairInt;

      repairInt = setInterval(function(){
        if( $('.feature__screenshot.is-repair-tool').offset().top + $('.feature__screenshot.is-repair-tool').height() / 3 * 2 <= $(document).scrollTop() + $(window).height() ) {
          setTimeout(function(){
            $(".feature__screenshot.is-repair-tool")[0].play();

            if( $('body').hasClass('p-machine-learning') ) {
              setTimeout(function(){
                showReplay();
              }, 15000);
            } else if ( $('video.feature__screenshot').hasClass('is-retouch-extension') ) {
              setTimeout(function(){
                showReplay();
              }, 10000);
            } else {
              setTimeout(function(){
                showReplay();
              }, 3000);
            }
          }, 1000);

          clearInterval( repairInt );
        }
      });

      function showReplay() {
        $('.replay').addClass('is-active');
      }

      $('.replay').on('click', function(){
        $(".feature__screenshot.is-repair-tool")[0].currentTime = 0;
        $(this).removeClass('is-active');
        setTimeout(function(){
          $(".feature__screenshot.is-repair-tool")[0].play();

          if( $('body').hasClass('p-machine-learning') ) {
            setTimeout(function(){
              showReplay();
            }, 15000);
          } else if ( $('video.feature__screenshot').hasClass('is-retouch-extension') ) {
            setTimeout(function(){
              showReplay();
            }, 10000);
          } else {
            setTimeout(function(){
              showReplay();
            }, 3000);
          }
        }, 50);

        return false;
      });
    }

    $('.btn--notify:not(.notify__submit):not(.notify__unsubscribe)').on('click', function(){
      $('.modal').addClass('is-active');
      setTimeout(function(){
        $('.modal').addClass('is-animated');
        $('.modal__content').addClass('is-active');
        $('.modal__close').addClass('is-active');
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

    var $notifyForm;
    $('.notify__submit').on('click', function(){
      $notifyForm = $(this).closest('.notify__form');
      var email = $notifyForm.find('.notify__email').val();
      var app = 'pro';

      var check = emailCheck(email);

      if( check != false ) {
        subscribe( email, app );
      } else {
        $notifyForm.find('.notify__email').addClass('is-false');
        setTimeout(function(){
          $notifyForm.find('.notify__email').removeClass('is-false');
        }, 550);
      }

      return false;
    });

    $('.notify__unsubscribe').on('click', function(){
      $(this).prop('disabled');

      var url = "/subscribtions/subscribe.php",
          status = 'unsubscribed';

      $.ajax({
          method: "POST",
          url: url,
          contentType : 'application/json',
          data: JSON.stringify({ uniqueId: unsubscribeUserID, listId: unsubscribeUserMailListID, status: status }),
          success: function(data) {
            $('.notify__unsubscribe-success').show();
            $('.notify__info').hide();
          }
      });

      return false;
    });

    var emailCheck = function(email) {
      var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      if(!regex.test(email)) {
          return false;
      }else{
          return email;
      }
    }

    var subscribe = function( email, app ) {
      showThankYou();
      var url,
        status = 'subscribed';
      referral = 'notify-block';
      url = "/subscribtions/subscribe.php";

      $.ajax({
          method: "POST",
          url: url,
          contentType : 'application/json',
          data: JSON.stringify({ email: email, referral: referral, app: app, status: status }),
          success: function(data) {
            console.log( data );
          }
      });
    };

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
      // $notifyBlock.find('.notify__content').addClass('is-invisible');
      // setTimeout(function(){
      //   $notifyBlock.find('.notify__thankyou').addClass('is-visible');
      //   $notifyBlock.find('.notify__email').val('').blur();
      // }, 150);
    };


    var buyParallax = function() {
      if( $(window).height() > 735 ) {
        if( $('.buy.is-notify').length && $('.buy').offset().top + 210 < $(document).scrollTop() + $(window).height() && $('.buy').offset().top ) {
          var delta = ($(document).scrollTop() + $(window).height() - $('.buy').offset().top - $('.buy .g-wrapper').height() ) / 2;
          if( delta > ($(window).height() - $('.buy .g-wrapper').height()) / 2) delta = ($(window).height() - $('.buy .g-wrapper').height()) / 2;
          if( delta < 210 ) delta = 210;

          $('.buy').find('.g-wrapper').css({
            '-webkit-transform': 'translate3d(0,' + delta.toFixed(2) + 'px, 0)',
                '-ms-transform': 'translate3d(0,' + delta.toFixed(2) + 'px, 0)',
                    'transform': 'translate3d(0,' + delta.toFixed(2) + 'px, 0)',
          });
        }
        if( $(document).scrollTop() + $(window).height() >= $(document).height() && !$('.footer__copyright').hasClass('is-active') ) {
          setTimeout(function(){
            if( $(document).scrollTop() + $(window).height() >= $(document).height() && !$('.footer__copyright').hasClass('is-active') ) {
              $('.footer__copyright').addClass('is-active');
            }
          }, 1000);
        }
        if( $(document).scrollTop() + $(window).height() < $(document).height() && $('.footer__copyright').hasClass('is-active') ) {
          $('.footer__copyright').removeClass('is-active');
        }
      }
      
      window.requestAnimationFrame( buyParallax );
    };

    buyParallax();

    // var mainNotifyBlockAnimation = function() {
    //   var placeToStop = $(document).scrollTop() + ( $(window).height() - $('.notify__top-content').height() ) / 2;
    //   var placeToStartMoving = $(document).scrollTop() + ( $(window).height() + $('.notify__top-content').height() ) / 2;
    //   var notifyTopTop = $('.notify__top').offset().top;
    //   var notifyTopBottom = $('.notify__top').offset().top + $('.notify__top').height();

    //   // console.log( notifyTopTop + " " + placeToStop + " " + notifyTopBottom + " " + placeToStartMoving );

    //   if( notifyTopTop < placeToStop && notifyTopBottom > placeToStartMoving ) {
    //     $('.notify__top-content').addClass('is-fixed');
    //   }else{
    //     $('.notify__top-content').removeClass('is-fixed');
    //   }

    //   if( notifyTopBottom < placeToStartMoving ) {
    //     $('.notify__top-content').addClass('is-bottom');
    //   } else {
    //     $('.notify__top-content').removeClass('is-bottom');
    //   }

    //   window.requestAnimationFrame( mainNotifyBlockAnimation );
    // }

    // if( $('.notify__top-content').length ) {
    //   mainNotifyBlockAnimation();
    // }

    if( $('.hero.is-splash').length ) {
      // $('.main-header').addClass('is-fixed');
      // $('.main-nav').addClass('is-fixed');

      function checkSplashScreenPosition() {
        // if( $(document).scrollTop() >= $('.hero.is-splash').innerHeight() ) {
        //   $('.main-header').addClass('is-absolute').removeClass('is-fixed');
        //   $('.main-nav').addClass('is-absolute').removeClass('is-fixed');
        // } else {
        //   $('.main-header').addClass('is-fixed').removeClass('is-absolute');
        //   $('.main-nav').addClass('is-fixed').removeClass('is-absolute');
        // }
        // if( $(document).scrollTop() >= $('.hero.is-splash').innerHeight() && $('.main-header').hasClass('is-fixed') ) {
        //   $('.hero.is-splash').hide();
        //   $('.main-header, .main-nav').removeClass('is-fixed');
        //   setTimeout(function(){
        //     $(document).scrollTop(0);
        //   }, 50);
        // }else if( !$('.main-header').hasClass('is-fixed') && $(document).scrollTop() <= 0 ) {
        //   $('.hero.is-splash').show();
        //   $('.main-header, .main-nav').addClass('is-fixed');
        //   setTimeout(function(){
        //     $(document).scrollTop( $('.hero.is-splash').innerHeight() );
        //   }, 50);
        // }
        // if( $(document).scrollTop() >= $('.hero.is-splash').innerHeight() && !$('.content.is-fixed').hasClass('is-absolute')) {
        //   $('.hero.is-splash').css('margin-bottom', 0);
        //   $('.content.is-fixed').addClass('is-absolute');
        //   $('.footer').removeClass('is-hidden');
        // }
        // if( $(document).scrollTop() + $(window).height() >= $('.hero.is-splash').innerHeight() && $(document).scrollTop() < $('.hero.is-splash').innerHeight()) {
        //   var scaleImage = 1 - ( $(document).scrollTop() + $(window).height() - $('.hero.is-splash').innerHeight() ) / (6 * $(window).height());

        //   if( scaleImage > 1 ) {
        //     scaleImage = 1;
        //   } else if( scaleImage < 0) {
        //     scaleImage = 0;
        //   }

        //   $('.hero.is-splash img').css({
        //     '-webkit-transform-origin': '50% 100%',
        //         '-ms-transform-origin': '50% 100%',
        //             'transform-origin': '50% 100%',
        //     '-webkit-transform': 'scale(' + scaleImage + ')',
        //         '-ms-transform': 'scale(' + scaleImage + ')',
        //             'transform': 'scale(' + scaleImage + ')'
        //   });
        // }

        requestAnimationFrame( checkSplashScreenPosition );
      }

      checkSplashScreenPosition();
    }

    // if( $('.out-backgrounds').length ) {
    //   function blobsParallax() {
    //     if( $(document).scrollTop() >= 0 && $(document).scrollTop() <= $('.hero').offset().top + $('.hero').height() ) {
    //       var delta = $(document).scrollTop();

    //       $('.out-backgrounds__background:nth-child(2)').css({
    //         '-webkit-transform': 'translate3d(0, ' + delta / 3 + 'px, 0)',
    //             '-ms-transform': 'translate3d(0, ' + delta / 3 + 'px, 0)',
    //                 'transform': 'translate3d(0, ' + delta / 3 + 'px, 0)'
    //       });
    //     }
    //     window.requestAnimationFrame( blobsParallax );
    //   }

    //   blobsParallax();
    // }

    // if( $('.out').length ) {
    //   function blobsParallax() {
    //     if( $(document).scrollTop() >= 0 && $(document).scrollTop() <= $('.hero').offset().top + $('.hero').height() ) {
    //       var delta = $(document).scrollTop();

    //       $('.out__background').css({
    //         '-webkit-transform': 'translate3d(0, ' + delta / 3 + 'px, 0)',
    //             '-ms-transform': 'translate3d(0, ' + delta / 3 + 'px, 0)',
    //                 'transform': 'translate3d(0, ' + delta / 3 + 'px, 0)'
    //       });
    //     }
    //     window.requestAnimationFrame( blobsParallax );
    //   }

    //   blobsParallax();
    // }

    if( $('.out-blobs').length ) {
      function blobsParallax() {
        if( $(document).scrollTop() >= 0 && $(document).scrollTop() <= $('.hero').offset().top + $('.hero').height() ) {
          var delta = $(document).scrollTop();

          for( var i = 0, l = $('.out-blobs__figure').length; i < l; i++ ) {
            var speed = $('.out-blobs__figure').eq(i).data('speed');
            $('.out-blobs__figure').eq(i).css({
              '-webkit-transform': 'translate3d(0, -' + Math.round(delta / speed) + 'px, 0)',
                  '-ms-transform': 'translate3d(0, -' + Math.round(delta / speed) + 'px, 0)',
                      'transform': 'translate3d(0, -' + Math.round(delta / speed) + 'px, 0)'
            });
          }
        }
        window.requestAnimationFrame( blobsParallax );
      }

      blobsParallax();
    }


    // What's new
    let blockHeight;
    const openNewSection = ( $block ) => {
      blockHeight = $block.height();

      window.requestAnimationFrame(function(){
        $block.addClass('is-active');
        $block.find('.new-section__block-artwork-wrapper').addClass('is-active');
        $block.find('.new-section__block-info').addClass('is-active');
        $block.find('.new-section__block-description').addClass('is-active');

        setTimeout(() => {
          $('.new-section__block-open-text').text( $('.new-section__block-open').data('close') );
        }, 300)
        setTimeout(() => {
          $block.find('.new-section__block-video').addClass('is-active');
        }, 400);
        setTimeout(() => {
          $block.find('.new-section__block-description').addClass('is-visible');
          $block.find('.new-section__block-artwork').addClass('is-visible');

          setTimeout(() => {
            $block.addClass('is-animated');
            $('video').each(function(){
              $(this)[0].play();
            });
          }, 600);
        }, 450);
      });
    }
    const closeNewSection = ( $block ) => {
      let blockNewHeight = $block.innerHeight();

      window.requestAnimationFrame(function(){
        $(document).scrollTop( $(document).scrollTop() - ( blockNewHeight - blockHeight));
        $block.find('.new-section__block-description').removeClass('is-visible');
        $block.find('.new-section__block-artwork').removeClass('is-visible');

        $block.find('.new-section__block-video').removeClass('is-active');

        $block.removeClass('is-active');
        $block.find('.new-section__block-artwork-wrapper').removeClass('is-active');
        $block.find('.new-section__block-info').removeClass('is-active');
        $block.find('.new-section__block-description').removeClass('is-active');

        setTimeout(() => {
          $('.new-section__block-open-text').text( $('.new-section__block-open').data('open') );
          $block.removeClass('is-animated');

          $('video').each(function(){
            $(this)[0].pause();
            $(this)[0].currentTime = 0;
          });
        }, 130)
      });
    }
    $('.new-section__block-open').on('click', function(){
      $block = $(this).prev('.new-section__block');
      if( $block.hasClass('is-active') ) {
        closeNewSection( $block );
      } else {
        openNewSection( $block );
      }
    });

    // $block.find('.new-section__block-artwork').removeClass('is-visible');
        // $block.find('.new-section__block-description').removeClass('is-visible is-active');

        // $block.css('min-height', $block.height());
        // setTimeout(() => {

        //   $block.find('.new-section__artwork-wrapper').removeClass('is-active');
        //   setTimeout(() => {
        //     let blockNewHeight = $block.height();
            
        //     setTimeout(() => {
        //       $('html, body').animate({
        //         scrollTop: $(document).scrollTop() - ( blockNewHeight - blockHeight )
        //       }, 600);
        //       $block.removeClass('is-active');
        //       setTimeout(() => {
        //         $block.removeAttr('style');
        //       }, 550);
        //     }, 60);
        //   }, 600);
        // }, 350)

        // setTimeout(() => {
        //   $block.next('.new-section__block-open-text').text( $block.next('.new-section__block-open').data('open') );
        // }, 300);
  });

  if( $('.with-asterisk').length ) {
    var info = $('.with-asterisk').data('description');
    var text = '<p class="copyright__text hero__description t-level-4_description">*' + info + '</p>';

    $('.footer__copyright .l-wrapper').prepend( text );
  }

})( jQuery );