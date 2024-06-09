(function( $ ) {
  $(function() {
    $('.tutorials-header__nav-link').on('click', function(){
      let linkTo = $(this).attr('href').split('/')[2];

      console.log( linkTo );

      let positionToScroll = $(`.tutorials-section__link[href*="${ linkTo }"]`).closest('h2').offset().top;

      $('html, body').animate({scrollTop: positionToScroll - 50}, 330);

      return false;
    })

    $(".more-options").on("click", function(){
      $(this).toggleClass("is-active");

      return false;
    });

    $(".more-options__menu").on("click", function(e){
      e.stopPropagation();
    });

    $(document).on("mouseup touchend", function(e){
      if ($(".more-options").has(e.target).length === 0 && $(".more-options").hasClass("is-active")) {
        $(".more-options").removeClass("is-active");
      }
    });

    if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {
      $('.js-copy_link').addClass('is-inactive');
    } else {
      $('.js-copy_link').on('click', function(){
        var $that = $(this);
        var $temp = $('<input>');
  
        $("body").append($temp);
        $temp.val( $that.data('link') ).select();
        document.execCommand("copy");
        $temp.remove();
  
        return false;
      });
    }

    // VIDEO
    if( $('.video-block__wrapper').length ) {
      if( $('.video-block__wrapper').data('youtube-link') != '' &&  $('.video-block__wrapper').data('youtube-link') != undefined ) {
        var youtubeLink = $('.video-block__wrapper').data('youtube-link').replace('https://youtu.be/', '');

        var $video = $('<iframe class="video-block__frame" src="https://www.youtube.com/embed/' + youtubeLink + '?showinfo=0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');
  
        $('.video-block__wrapper').prepend( $video );
      } else if( $('.video-block__wrapper').data('video-link') != '' && $('.video-block__wrapper').data('video-link') != undefined ) {
        var vimeoLink = $('.video-block__wrapper').data('video-link').replace('https://vimeo.com/', '');

        var $video = $('<iframe class="video-block__frame" src="https://player.vimeo.com/video/' + vimeoLink + '?title=0&byline=0&portrait=0" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');
  
        $('.video-block__wrapper').prepend( $video );
      }
    }

    // SHOW MORE
    $('.tutorials-more__btn').on('click', function(){
      var $btn = $(this);
      var $container = $(this).closest('.tutorials-section').find('.tutorials-section__grid');
      if( $btn.hasClass('is-opened') ) {
        $container.addClass('with-transition');
        setTimeout(function(){
          $btn.removeClass('is-opened');
          $container.removeClass('is-opened');
          setTimeout(function(){
            $container.removeClass('with-transition');
          }, 320);
        }, 50);
      } else {
        $container.addClass('with-transition');
        setTimeout(function(){
          $btn.addClass('is-opened');
          $container.addClass('is-opened');
          setTimeout(function(){
            $container.removeClass('with-transition');
          }, 320);
        }, 50);
      }
    });

    if( $('.tutorials-meta__comments').length ) {
      var link = $('.tutorials-meta__comments').attr('href');
      var topicId = link.split('&')[1].replace('t=', '');

      $.ajax({
        type: "POST",
        url: '/community/styles/mossaik/template/getCommentCountByTopic.php',
        data: 'topic_id=' + topicId
      }).done(function(data){
        var count = data - 1;
        if( count > 0) {
          $('.tutorials-meta__comments-count').text( count );
        } else {
          $('.tutorials-meta__comments-count').text( 0 );
        }
      });
      $.ajax({
       type: "POST",
       url: '/community/styles/mossaik/template/getPostsAjaxByTopic.php',
       data: 'topic_id=' + topicId
      }).done(function(data){
        var dataArray = JSON.parse(data);

        if( dataArray.length ) {
          var comments = '';

          for( var i = 1, l = dataArray.length; i < l; i++ ){

            // Prepare Date Format
            var getDateFormat = function( date ) {
              var nowDate = Math.floor(new Date().getTime()/1000);
              var delta = nowDate - date;

              if( delta <= 59 ) {
                return( delta + ' seconds ago' );
              }else if (delta <= 119) {
                return( 'a minute ago' );
              }else if (delta <= 3599) {
                var min = Math.floor(delta / 60);
                return( min + ' minutes ago' );
              }else if (delta <= 7199) {
                return( 'an hour ago');
              }else if (delta <= 86399) {
                var hour = Math.floor( delta / 3600 );
                return( hour + ' hours ago');
              }else if (delta <= 172799) {
                return( 'a day ago');
              }else if (delta <= 2591999) {
                var days = Math.floor(delta / 86400);
                return( days + ' days ago');
              }else{
                return( 'a while ago' );
              }
            }
            var date = getDateFormat( dataArray[i].time );
            

            // Check avatar
            var avatar;
            if( dataArray[i].avatar.length ) {
              avatar = '<img alt="" src="//www.mossaik.com/community/download/file.php?avatar=' + dataArray[i].avatar + '" class="avatar" height="42" width="42">'
            } else {
              avatar = '<img alt="" src="//pro-cdn.mossaik.com/community/avatar_empty@2x.png" class="avatar" height="42" width="42">'
            }

            // Remove extra tags from comment
            var commentText = dataArray[i].text.replace(/<E>|<\/E>|<t>|<\/t>|<s>|<\/s>|<e>|<\/e>|<r>|<\/r>|\[b]|\[\/b]|\[i]|\[I]|\[\/i]/g, " ");

            // Remove tags in square brackets
            commentText = commentText.replace(/\[\/applescript]/g, '').replace(/\[applescript]/g,'');
            commentText = commentText.replace(/\[\/quote]/g, '').replace(/\[quote=.*\]/g,'');
            commentText = commentText.replace(/\[img](.*?)\[\/img]/g, '');
            commentText = commentText.replace(/\[fullvideo](.*?)\[\/fullvideo]/g, '<video playsinline mute controls><source src="$1" type="video/mp4"></video>');
            commentText = commentText.replace(/<\/applescript>/gi, '</code></pre>').replace(/<applescript>/gi, '<pre><code class="applescript">');
            commentText = commentText.replace(/<\/URL>/g, '</a>').replace(/<URL url="(.*?)">/, '<a href="$1">');
            commentText = commentText.replace(/\[url="(.*?)"](.*?)\[\/url]/g, '$2');
            commentText = commentText.replace(/\[url=(.*?)](.*?)\[\/url]/g, '$2');
            commentText = commentText.replace('https:', '');
            commentText = commentText.replace('http:', '');
            commentText = commentText.replace(/:(.*?):/g, '');


            // Comment markup
            var comment = ''
            + '<li class="comment even thread-even depth-1">'
              + '<article class="comment__entry">'
                + avatar
                + '<div class="comment__body">'
                  + '<p class="comment__author t-level-3_title-s">' + dataArray[i].author + '</p>'
                  + '<p class="comment__body">' + commentText + '</p>'
                  // + '<footer class="comment__footer">'
                  //   + '<span class="comment__date">' + date + '</span>'
                  // + '</footer>'
                + '</div>'
              + '</article>'
            + '</li>';

            if( $(comment).find('.comment__body img').length > 0 ) {
              $(comment).find('.comment__body img').attr('class', 'postimage');
            }

            comments += comment;
          }

          var $commentsBlock = ''
          + '<article class="comments" id="comments">'
            + '<h2 class="t-level-3_title">Comments</h2>'
            + ( dataArray.length > 1 ? '<ul class="comments__list">' + comments + '</ul>' : '<p class="comments__description">Be the first to add a comment about this tutorial.</p>')
          + '</article>';

          $('.next-block, .next-block, .next-block').after( $commentsBlock );

          document.querySelectorAll('.comment__entry pre code').forEach((block) => {
            hljs.highlightBlock(block);
          });

          const setImageSize = function( $el ) {
            let imageWidth = $el[0].naturalWidth / 2;
            let imageHeight = $el[0].naturalHeight / 2;
            $el.wrap('<p />');
            $el.attr({
              'width': imageWidth,
              'height': imageHeight,
            });
          }
          if( $(".comment__body img").length ) {
            for( let i = 0, l = $(".comment__body img").length; i < l; i++) {
              if($(".comment__body img").eq(i).get(0).complete) {
                setImageSize( $('.comment__body img').eq(i) );
              }
              else {
                $(".comment__body img").eq(i).on('load', function() {
                  setImageSize( $('.comment__body img').eq(i) );
                });
              }
            }
          }
        }
      });
    }

    // IN APP HELP
    if( $('.in-app-help-page').length ) {
      var container = $('.in-app');
      var link = container.data('url');
      var hashtag = link.split('#')[1];

      $('.tutorials-section__item').removeClass('is-large');
      $('.tutorials-section__item').addClass('is-half-width');

      var fixHelpImages = function(){
        for ( var i = 0, l = container.find('img').length; i < l; i++ ) {
          if( container.find('img').eq(i).attr('src').indexOf('/mossaik-pro/') >= 0 ) {
            container.find('img').eq(i).attr( 'src', '//help.mossaik.com' +  container.find('img').eq(i).attr('src') );
          }
        }
      };

      $.ajax({
        type: "GET",
        url: '/tutorials/getHelpContents.php',
        dataType: "json"
      }).done(function(data){
        $('.footer').addClass('is-active');
        $('.tutorials-section').addClass('is-active');
        var content = data['content'];
        var hierarchy = data['hierarchy'];
        var items;

        hierarchy = jQuery.map( hierarchy, function( contents, i){
          if( contents['id'] == hashtag ) {
            items = contents['children'];
          }
        });

        if( items.length ) {
          var nav = '',
              info = '';
          for( var i = 0, l = items.length; i < l; i++ ) {
            var id = items[i]['id'];
            var name = data['content'][ id ]['name'];
            if( items[i]['children'] ) {
              var childInfo = '';
              for( var y = 0, l = items[i]['children'].length; y < l; y++ ) {
                var childID = items[i]['children'][y]['id'];
                var content = data['content'][childID]['content'];

                childInfo += '<section class="in-app__section" data-id="' + childID + '">' + content + '</section>'
              }
              nav += '<a class="in-app__nav-item" data-id="' + id + '">' + name + '</a>';
              info += '<article class="in-app__article" data-id="' + id + '"><h1>' + name + '</h1>' + childInfo + '</article>';
            } else {
              var content = data['content'][ id ]['content'];
  
              nav += '<a class="in-app__nav-item" data-id="' + id + '">' + name + '</a>';
              info += '<article class="in-app__article" data-id="' + id + '">' + content + '</article>';
            }
          }
          container.append( '<nav class="in-app__nav">' + nav + '</nav>' );
          container.append( info );
          fixHelpImages();
          if( window.location.hash ) {
            var hash = window.location.hash.replace('#', '');
            $('.in-app__nav-item[data-id="' + hash + '"]').trigger('click');
            history.replaceState({}, document.title, ".");
          }
        }
        
      });

      if( $('.in-app-help[href="' + window.location.href + '"]').length ) {
        $('.in-app-help[href="' + window.location.href + '"]').addClass('is-active');
      }
    }

    $(document).on('click', '.in-app__nav-item', function(){
      $('html, body').animate({
        scrollTop: $('.in-app__article[data-id=' + $(this).data('id') + ']').offset().top - 90
      }, 500)

      return false;
    });

    if( $('.tutorials-hero').length ) {
      var transitionTime = 330;
      //var extraThreshold = 400; // USE THIS WITH AUTOCHANGE
      var extraThreshold = 0;
      var transitionTimeout;
      var tutorialsHeroWrapper = $('.tutorials-hero__wrapper');

      var firstItem = $('.tutorials-hero__item').eq(0).clone();
      var secondItem = $('.tutorials-hero__item').eq(1).clone();
      var beforeLastItem = $('.tutorials-hero__item').eq( $('.tutorials-hero__item').length - 2 ).clone();
      var lastItem = $('.tutorials-hero__item').last().clone();

      tutorialsHeroWrapper.prepend( lastItem ).prepend( beforeLastItem ).append( firstItem ).append( secondItem );

      var tutorialsHeroItem = $('.tutorials-hero__item');
      tutorialsHeroItem.eq(2).addClass('is-active');

      tutorialsHeroItem.css({
        '-webkit-transform': 'translateX( -200% )',
            '-ms-transform': 'translateX( -200% )',
                'transform': 'translateX( -200% )'
      });

      setTimeout(function(){
        tutorialsHeroWrapper.addClass('is-active');
        tutorialsHeroItem.addClass('with-transition');
      }, 50);

      var heroItemFlag = false;

      var nextItem = function() {
        heroItemFlag = true;

        var activeIndex = $('.tutorials-hero__item.is-active').index();

        nextItemIndex = activeIndex + 1;

        tutorialsHeroItem.removeClass('is-active');
        tutorialsHeroItem.eq(nextItemIndex).addClass('is-active');
        tutorialsHeroItem.css({
          '-webkit-transform': 'translateX( -' + (nextItemIndex) * 100 + '% )',
              '-ms-transform': 'translateX( -' + (nextItemIndex) * 100 + '% )',
                  'transform': 'translateX( -' + (nextItemIndex) * 100 + '% )'
        });
        if( !$('.tutorials-hero__item').eq(activeIndex + 3).length ) {
          tutorialsHeroItem.eq(2).addClass('is-active');

          setTimeout(function(){
            tutorialsHeroItem.removeClass('with-transition');
            setTimeout(function(){
              tutorialsHeroItem.css({
                '-webkit-transform': 'translateX( -200% )',
                    '-ms-transform': 'translateX( -200% )',
                        'transform': 'translateX( -200% )'
              });
              setTimeout(function(){
                tutorialsHeroItem.addClass('with-transition');
                tutorialsHeroItem.not( tutorialsHeroItem.eq(2) ).removeClass('is-active');
              }, 50);
            }, 50);
          }, transitionTime);
        }

        setTimeout(function(){
          heroItemFlag = false;
        }, transitionTime + extraThreshold + 50)
      }

      $('.tutorials-hero__nav-item.is-next').on('click', function(){
        if( heroItemFlag ) return false;
        nextItem();
      });

      var prevItem = function() {
        heroItemFlag = true;

        var activeIndex = $('.tutorials-hero__item.is-active').index();

        nextItemIndex = activeIndex - 1;

        tutorialsHeroItem.removeClass('is-active');
        tutorialsHeroItem.eq(nextItemIndex).addClass('is-active');
        tutorialsHeroItem.css({
          '-webkit-transform': 'translateX( -' + (nextItemIndex) * 100 + '% )',
              '-ms-transform': 'translateX( -' + (nextItemIndex) * 100 + '% )',
                  'transform': 'translateX( -' + (nextItemIndex) * 100 + '% )'
        });
        if( activeIndex - 2 == 0 ) {
          tutorialsHeroItem.eq( tutorialsHeroItem.length - 3 ).addClass('is-active');

          setTimeout(function(){
            tutorialsHeroItem.removeClass('with-transition');
            setTimeout(function(){
              tutorialsHeroItem.css({
                '-webkit-transform': 'translateX( -' + (tutorialsHeroItem.length - 3) * 100 + '% )',
                    '-ms-transform': 'translateX( -' + (tutorialsHeroItem.length - 3) * 100 + '% )',
                        'transform': 'translateX( -' + (tutorialsHeroItem.length - 3) * 100 + '% )'
              });
              setTimeout(function(){
                tutorialsHeroItem.addClass('with-transition');
                tutorialsHeroItem.not( tutorialsHeroItem.eq( tutorialsHeroItem.length - 3 ) ).removeClass('is-active');
              }, 50);
            }, 50);
          }, transitionTime);
        }

        setTimeout(function(){
          heroItemFlag = false;
        }, transitionTime + extraThreshold + 50)
      }

      $('.tutorials-hero__nav-item.is-previous').on('click', function(){
        if( heroItemFlag ) return false;
        prevItem();
      });

      var sliderInterval;

      $(document).on('click', '.tutorials-hero__item.is-active', function(){
        var link = $(this).find('.tutorials-hero__link').attr('href');
        window.location.href = link;
        
        return false;
      });

      // var setSliderInterval = function(){
      //   sliderInterval = setInterval(function(){
      //     $('.tutorials-hero__nav-item.is-next').triggerHandler('click');
      //   }, 5000);
      // };

      // var clearSliderInterval = function(){
      //   clearInterval( sliderInterval );
      // }

      // setSliderInterval();

      // $('.tutorials-hero').on('mouseenter', clearSliderInterval).on('mouseleave', setSliderInterval);

      // $(window).on('blur', clearSliderInterval).on('focus', setSliderInterval);
    }

    if( $('.tutorials-hero').length ) {
      if( window.location.hash ) {
        let hash = window.location.hash.replace('#', '');
        history.replaceState(null, null, window.location.pathname);

        if( $(`.tutorials__article[data-section=${hash}]`).length ) {
          $('html, body').animate({
            scrollTop: $(`.tutorials__article[data-section=${hash}]`).offset().top - 50
          }, 300);
        }
      }
    }

    if( $('.guide-tutorial').length ) {
      // $(window).on('load', function(){
      //   $('.guide-tutorial').find('.guide-tutorial__content img').addClass('is-visible');
      // });
      $('.guide-tutorial').find('.guide-tutorial__content img').addClass('is-visible');

      let requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                            window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

      let cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;

      let allVideos = $('.guide-tutorial__content video').length;
      let playingVideos = 0;
      let videoRequest;

      const checkVideo = function() {
        if ( playingVideos == allVideos ) {
          cancelAnimationFrame( videoRequest );
        } else {
          for( let i = 0; i < allVideos; i++ ) {
            let video = $('.guide-tutorial__content video').eq( i );
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
      
      let videoReplayOverlay = '<span class="video-replay-overlay"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 26"><defs></defs><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><g id="Regular-M"><path class="cls-1" d="M12,26A12.09,12.09,0,0,0,24,14,12.1,12.1,0,0,0,14.27,2.22V.83c0-.83-.58-1-1.21-.6L9.31,2.58a.74.74,0,0,0,0,1.33l3.74,2.33c.64.47,1.22.25,1.22-.6V4.26A10,10,0,1,1,6.14,5.92a1,1,0,0,0,.34-1.41A1,1,0,0,0,5,4.29,12.08,12.08,0,0,0,0,14,12.09,12.09,0,0,0,12,26Z"/></g></g></g></svg></span>';

      if( $('.guide-tutorial__content video').length ) {
        $('.guide-tutorial__content video').each(function() {
          let $this = $(this);
          if( $this.attr('loop') != 'loop' ) {
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
    }

    if( $('.tips-and-tricks__video-file').length ) {
      $(window).on('load', function(){
        $('.tips-and-tricks__video-buttons').removeClass('is-inactive');
      });

      $('.tips-and-tricks__video-buttons').on('click', function(){
        $('.tips-and-tricks__video-button.is-active').trigger('click');
      });

      $('.tips-and-tricks__video-button').on('click', function(){
        var $that = $(this);

        if( $that.hasClass('is-active') ) {
          var buttonType = $that.data('type');

          if( buttonType == 'pause' ) {
            $('.tips-and-tricks__video-button[data-type=' + buttonType + ']').removeClass('is-active');
            $('.tips-and-tricks__video-file')[0].pause();
            setTimeout(function(){
              $('.tips-and-tricks__video-button[data-type=play]').addClass('is-active');
            }, 65);
          } else if ( buttonType == 'play' ) {
            $('.tips-and-tricks__video-button[data-type=' + buttonType + ']').removeClass('is-active');
            $('.tips-and-tricks__video-file')[0].play();
            setTimeout(function(){
              $('.tips-and-tricks__video-button[data-type=pause]').addClass('is-active');
            }, 65);
          }
        }
      });
    }

    if( $('.color-label').length ) {
      for( let i = 0, l = $('.color-label').length; i < l; i++ ) {
        $('.color-label').eq(i).prepend(`<span class="color-label__label" style="background-color: ${$('.color-label').eq(i).text()};"></span>`)
      }
    }
  });

} )( jQuery );
