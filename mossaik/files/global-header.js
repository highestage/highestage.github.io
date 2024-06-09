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
        setTimeout(() => {
          $header.addClass('no-transition');
        }, 500);
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
      setTimeout(() => {
        $header.removeClass('no-transition');
      }, 60);
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
    if( $('.main-header').length ) {
      globalHeader.start();
    } else if( $('.header').length ) {
      let openHeaderFlag = false;

      $('.header__explore').on('click', (e) => {
        if( openHeaderFlag ) return false;

        let $this = $(e.currentTarget);
        let $header = $this.closest('.header');
        let $nav = $header.find('.header__nav');
        let $navInner = $nav.find('.header__nav-inner');
  
        if( $this.hasClass('is-opened') ) {
          openHeaderFlag = true;

          $('html').removeClass('stop-scroll');
          $nav.removeClass('with-bg');
          $nav.removeClass('is-visible');
          $nav.addClass('no-bg');
          setTimeout(() => {
            $navInner.removeClass('is-opened');
            $this.removeClass('is-opened');
            setTimeout(() => {
              $header.removeClass('is-opened');
            }, 350);
            setTimeout(() => {
              $nav.removeClass('is-opened');
              $nav.removeClass('no-bg');
              openHeaderFlag = false;
            }, 550);
          }, 130);
        } else {
          openHeaderFlag = true;

          $('html').addClass('stop-scroll');
          $this.addClass('is-opened');
          $header.addClass('is-opened');
          $nav.addClass('is-opened');
          setTimeout(() => {
            $navInner.addClass('is-opened');
            setTimeout( () => {
              $nav.addClass('is-visible');
              $nav.addClass('with-bg');
              openHeaderFlag = false;
            }, 330 );
          }, 180);
        }
      });
  
      $('.header__title span').on('click', () => {
        if( $('.header').hasClass('is-opened') ) {
          $('.header__explore').trigger('click');
        }
        $('html,body').animate({ scrollTop: 0 }, 330);
      });
    } else if( $('.main-nav').length ) {
      const closeMainNav = ( closeAll ) => {
        let $this = $('.current-page__hamburger-btn');
        let $mainNav = $('.main-nav');
        let $mainNavLink = $('.main-nav__nav-link');
        let $mainNavBG = $('.main-nav__bg');
        
        if( !closeAll ) {
          $mainNav.removeClass('is-visible');
          $mainNavBG.addClass('is-invisible');
          setTimeout(() => {
            $mainNavBG.removeClass('is-invisible');
          }, 400)
        }
        $this.removeClass('is-opened')
        $mainNavLink.removeClass('is-opened');
        $('html').removeClass('stop-scroll');
        setTimeout( () => {
          $mainNav.removeClass('is-opened');
          setTimeout(() => {
            $mainNav.removeClass('is-visible');
          }, 550)
        }, 100);
        setTimeout(() => {
          $mainNavBG.removeClass('is-active');
        }, 170)
        if( closeAll ) $('.current-page').removeClass('is-opened');
      }
      $('.current-page__hamburger-btn').on('click', function(){
        let $this = $(this);
        let $mainNav = $('.main-nav');
        let $mainNavLink = $('.main-nav__nav-link');
        let $mainNavBG = $('.main-nav__bg');

        if( $this.hasClass('is-opened') ) {
          closeMainNav( true );
        } else {
          if( $('.current-page__title').hasClass('is-opened') ) {
            closeInnerNav( false ); 
          } else {
            $('.current-page').addClass('is-opened');
          }

          $('html').addClass('stop-scroll');
          $this.addClass('is-opened');
          $mainNav.addClass('is-opened is-visible');
          $mainNavBG.addClass('is-active');

          // Close guide search
          $('.guide-current-page__title').removeClass('is-opened');
          $('.guides__search-wrapper').removeClass('is-active');
          $('.search-results-bg').removeClass('is-active--mobile');
          
          $('.search-results-bg').removeClass('is-active');
          setTimeout(function() {
            $('.search-results').removeClass('is-opened');
            setTimeout(function() {
              $('.search-results__number-count').text('');
              $('.search-results__results').html('');
              $('.guides__search-input').val('');
            }, 150);
          }, 90);

          setTimeout(() => {
            $mainNavLink.addClass('is-opened');
          }, 430)
        }

        return false;
      });

      let scrollPositionOnInnerNavOpenning;
      let scrollPositionOnInnerNavOpenningTimer;
      let innerNavFlag = false;

      const closeInnerNav = ( closeAll ) => {
        innerNavFlag = true;
        let $this = $('.current-page__title');
        let $currentNav = $('.current-page__nav');
        let $currentNavLink = $('.current-page__nav-link');
        let $currentNavBG = $('.current-page__bg');

        if( scrollPositionOnInnerNavOpenningTimer ) {
          clearInterval( scrollPositionOnInnerNavOpenningTimer );
        }
        if( !closeAll ) $currentNav.removeClass('is-visible');
        scrollPositionOnInnerNavOpenning = '';
        $this.removeClass('is-opened');
        $currentNavLink.addClass('is-closing');
        setTimeout( () => {
          $currentNavBG.removeClass('is-opened');
          setTimeout( () => {
            $currentNav.removeClass('is-opened');
            $currentNavLink.removeClass('is-closing is-opened');
          } , 230)
          setTimeout(() => {
            $currentNav.removeClass('is-visible');
            innerNavFlag = false;
          }, 400);
        }, 130 );
        if( closeAll ) $('.current-page').removeClass('is-opened');
      }
      $('.current-page__title').on('click', function(){
        if( $(window).width() < 850 ) {
          if( $(this).find('.current-page__title-link').hasClass('is-inactive') ) return false;
          
          let $this = $(this);
          let $currentNav = $('.current-page__nav');
          let $currentNavLink = $('.current-page__nav-link');
          let $currentNavBG = $('.current-page__bg');

          if( $this.hasClass('is-opened') ) {
            closeInnerNav( true );
          } else {
            if( innerNavFlag ) return false;

            if( $('.main-nav').hasClass('is-opened') ) {
              closeMainNav( false );
            } else {
              $('.current-page').addClass('is-opened');
            }

            innerNavFlag = true;
            scrollPositionOnInnerNavOpenning = $(document).scrollTop();
            scrollPositionOnInnerNavOpenningTimer = setInterval(() => {
              if( $(document).scrollTop() > scrollPositionOnInnerNavOpenning + 10 || $(document).scrollTop() < scrollPositionOnInnerNavOpenning - 10 ) {
                closeInnerNav( true )
              }
            }, 60);

            $this.addClass('is-opened');
            $currentNav.addClass('is-opened is-visible');
            $currentNavBG.addClass('is-opened');
            setTimeout( () => {
              $currentNavLink.addClass('is-opened');
              innerNavFlag = false;
            }, 350 )
          }

          return false;
        }
      })

      const checkNav = () => {
        if( $(document).scrollTop() >= 51) {
          $('.current-page').addClass('is-scrolled');
        } else {
          $('.current-page').removeClass('is-scrolled');
        }

        window.requestAnimationFrame( checkNav );
      }
      checkNav();
    }
  });

})( jQuery );
