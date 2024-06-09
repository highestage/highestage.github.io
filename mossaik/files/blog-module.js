var blogActions = (function( $ ) {
  'use strict';

  var $replyBtn = $(".comment-reply-link"),
      $contactForm = $(".comments-form"),
      $moreOptions = $(".more-options"),
      $moreOptionsMenu = $(".more-options__menu"),
      $cancelReply = '<a class="comments-form__cancel">Cancel</a>',
      $blogComments = $('.blog-post__link');

  var _bindUIActions = function() {
    // Check hash and scroll to comments
    if(window.location.hash && (window.location.hash.toLowerCase().indexOf("comment") >= 0 || window.location.hash.toLowerCase().indexOf("respond") >= 0)) {
      var hash = window.location.hash.replace("#", "").split('&');
      if(hash[1]) {
        $('html, body').animate({
          scrollTop: hash[1].replace('pos=', '')
        }, 0);
      }
      window.history.replaceState('', '', window.location.hash.split('&')[0]);
    }

    $blogComments.on('click', function(){
      var pos = Math.round($(document).scrollTop() - $(this).closest('.blog-post').offset().top + 132);
      var link = $(this).attr('href');
      link = link + "&pos=" + pos;

      window.location.href = link;

      return false;
    });

    $replyBtn.on("click", function(){
      var $el = $( this );
      if($el.hasClass("is-active")) {
        _cancelReply( $el.closest(".comment__entry").next(".comments-form").find(".comments-form__cancel") );

        return false;
      }

      _prepareForm( $el );

      return false;
    });
    $(document).on("click", ".comments-form__cancel", function(){
      _cancelReply( $(this) );

      return false;
    });

    $moreOptions.on("click", function(){
      $(this).toggleClass("is-active");

      return false;
    });

    $moreOptionsMenu.on("click", function(e){
      e.stopPropagation();
    });

    $(document).on("mouseup touchend", function(e){
      if ($moreOptions.has(e.target).length === 0 && $moreOptions.hasClass("is-active")) {
        $moreOptions.removeClass("is-active");
      }
    });

    $('.js-copy_link').on('click', function(){
      var $that = $(this);
      var $temp = $('<input>');

      $("body").append($temp);
      $temp.val( $that.data('link') ).select();
      document.execCommand("copy");
      $temp.remove();

      return false;
    });
  };

  var _prepareForm = function( $el ) {
    $el.addClass("is-active");
    var parentId = $el.closest(".comment__entry").data("value");
    var $newForm = $contactForm.clone();
    var newHeight = $contactForm.height();
    $newForm.addClass('is-hidden is-invisible');
    $newForm.find(".comments-form__submit").before($cancelReply);
    $newForm.find("#comment_parent").attr("value", parentId);
    $el.closest(".comment__entry").after($newForm);
    setTimeout(function(){
      if($newForm.offset().top + newHeight > $(document).scrollTop() + $(window).height()) {
        var diff = $(document).scrollTop() + ($(document).scrollTop() + $(window).height() - $newForm.offset().top + newHeight);
        $('html, body').animate({
          scrollTop: diff
        }, 200);
      }
      $newForm.removeClass('is-hidden');
      setTimeout(function(){
        $newForm.removeClass('is-invisible');
      }, 100);
    }, 50);
  };

  var _cancelReply = function( $el ) {
    $el.closest('.comments-form').addClass('is-invisible');
    setTimeout(function(){
      $el.closest('.comments-form').addClass('is-hidden');
      setTimeout(function(){
        $el.closest(".comments-form").prev(".comment__entry").find(".comment-reply-link").removeClass("is-active");
        $el.closest(".comments-form").remove();
      }, 180);
    }, 200);
  }

  var ready = function() {
    if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {
      $('.js-copy_link').addClass('is-inactive');
    }
    _bindUIActions();
  };

  return {
    ready: ready
  }
}) ( jQuery );

(function( $ ) {

  $(function() {

    blogActions.ready();

    if( $('.blog-post__comments-count').length ) {
      $('.blog-post__comments-count').each(function(){
        var $that = $(this);

        var link = $that.closest('.blog-post__comments').attr('href');
        var topicId = link.split('&')[1].replace('t=', '');

        $.ajax({
          type: "POST",
          url: '/community/styles/mossaik/template/getCommentCountByTopic.php',
          data: 'topic_id=' + topicId
        }).done(function(data){
          var count = data - 1;
          if( count > 0) {
            $that.text( count );
          } else {
            $that.text( 0 );
          }
        });
      });
    }

    let requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

    let cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;

    let allVideos = $('.blog-post video').length;
    let playingVideos = 0;
    let videoRequest;

    const checkVideo = function() {
      if ( playingVideos == allVideos ) {
        cancelAnimationFrame( videoRequest );
      } else {
        for( let i = 0; i < allVideos; i++ ) {
          let video = $('.blog-post video').eq( i );
          if( !video.hasClass('is-playing') && (video.offset().top <= ($(window).scrollTop() + $(window).height() * 0.75)) && video.attr('autoplay') != 'autoplay' ) {
            video.addClass('is-playing');
            video.addClass(`is-${i}`);
            video[0].onended = function(e) {
              console.log($(`video.${e.target.classList.value.replace('is-playing ', '')}`));
            } 
            video[0].play();
            if( video.attr('loop') != 'loop' ) {
              video[0].onended = function(e) {
                $(this).next('.video-replay-overlay').addClass('is-visible');
              }
            }
            playingVideos++;
          }
        }
        requestAnimationFrame( checkVideo );
      }
    }

    let videoReplayOverlay = '<span class="video-replay-overlay"><span class="video-replay-overlay__button"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 26"><defs></defs><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><g id="Regular-M"><path class="cls-1" d="M12,26A12.09,12.09,0,0,0,24,14,12.1,12.1,0,0,0,14.27,2.22V.83c0-.83-.58-1-1.21-.6L9.31,2.58a.74.74,0,0,0,0,1.33l3.74,2.33c.64.47,1.22.25,1.22-.6V4.26A10,10,0,1,1,6.14,5.92a1,1,0,0,0,.34-1.41A1,1,0,0,0,5,4.29,12.08,12.08,0,0,0,0,14,12.09,12.09,0,0,0,12,26Z"/></g></g></g></svg></span></span>';

    if( $('.blog-post video').length ) {
      $('.blog-post video').each(function() {
        let $this = $(this);
        if( $this.attr('loop') != 'loop' && !$this.closest('.video-wrapper').length ) {
          aspectRatio = (($this.attr('height') / $this.attr('width')) * 100).toFixed(2);
          $this.wrap(`<div style="position: relative;margin-top: 29px; margin-bottom: 33px;padding-top: ${ aspectRatio }%;overflow: hidden;"></div>`);
          $this.after( videoReplayOverlay)
        }
      });

      checkVideo();

      $(document).on('click', '.video-replay-overlay', function() {
        let $this = $(this);
        $this.removeClass('is-visible');
        setTimeout(function(){
          $this.prev('video')[0].currentTime = 0;
          $this.prev('video')[0].play();
        }, 330)
      })
    }
  });
} )( jQuery );
