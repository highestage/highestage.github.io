(function( $ ){

  var globalHeader = function( $ ) {
    'use strict';

    var $explore = $('.explore'),
        $header = $('.main-header'),
        $app = $('.main-header__app .app'),
        $overlay = $('.header-overlay'),
        $menu = $('.menu'),
        $subnavigation = $('.subnavigation'),
        $nav = $('.main-nav'),
        $background = $('.main-nav__background'),
        navFlag = false;

    var startScroll,
        scrollTimer;

    var openHeader = function() {
      if( navFlag ) return false;
      navFlag = true;
      startScroll = $(document).scrollTop();
      if( $background.height() < $(window).height() ) {
        scrollTimer = setInterval(function(){
          if( startScroll + 15 < $(document).scrollTop() ) {
            globalHeader.close();
          }
        }, 60);
      }
      $explore.addClass('is-active');
      $app.addClass('is-active');
      $background.addClass('is-active');
      setTimeout(function() {
        $background.addClass('is-animated');
        navFlag = false;
      }, 250);

      $overlay.addClass('is-active');
      setTimeout(function(){
        $overlay.addClass('is-animated');
      }, 200);

      setTimeout(function() {
        $menu.addClass('is-visible');
        $subnavigation.addClass('is-visible');
      }, 100);

      setTimeout(function() {
        $header.addClass('is-active')
        $subnavigation.addClass('is-active');
        $menu.addClass('is-active');
        $nav.addClass('is-active');

        setTimeout(function(){
          $subnavigation.addClass('is-animated');
          $menu.addClass('is-animated');
        }, 200);
      }, 200);
    };

    var closeHeader = function() {
      if( navFlag ) return false;
      navFlag = true;
      clearInterval(scrollTimer);
      $explore.removeClass('is-active');
      $app.removeClass('is-active');
      $header.removeClass('is-active');
      $overlay.removeClass('is-active');
      setTimeout(function() {
        $overlay.removeClass('is-animated');
      }, 300);

      $menu.removeClass('is-active is-visible');
      $subnavigation.removeClass('is-active is-visible');

      setTimeout(function() {
        $menu.removeClass('is-animated');
        $subnavigation.removeClass('is-animated');
        $nav.removeClass('is-active');
      }, 200);

      setTimeout(function(){
        $background.removeClass('is-active');
        setTimeout(function(){
          $background.removeClass('is-animated');
          navFlag = false;
        }, 200);
      }, 100);
    };

    var startHeaderActions = function() {
      $explore.on('click', function(){
        if( $(this).hasClass('is-active') ) {
          globalHeader.close();
        } else {
          globalHeader.open();
        }
      });

      if( $background.height() < $(window).height() ) {
        $(document).on("mouseup touchend", function(e){
          if ( $('.main-header').has(e.target).length === 0 && $('.nav__container').has(e.target).length === 0 && $explore.hasClass("is-active") && !$explore.is(e.target) ) {
          globalHeader.close();
          }
        });
      } else {
        $(document).on("mouseup touchend", function(e){
          if ( $('.main-header').has(e.target).length === 0 && $('.main-nav').has(e.target).length === 0 && $explore.hasClass("is-active") && !$explore.is(e.target) ) {
            globalHeader.close();
          }
        });
      }
    };

    return {
      start: startHeaderActions,
      open: openHeader,
      close: closeHeader
    }
  } (jQuery);

  $(function(){
    globalHeader.start();
  });

})( jQuery );
