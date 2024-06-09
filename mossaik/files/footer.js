$(function(){
  $('.global-footer__nav-title').on('click', function(){
    if( $(window).width() <= 767 ) {
      let $this = $(this);
      let $links = $this.next('.global-footer__nav-links');
      
      if( $this.hasClass('is-opened') ) {
        $links.addClass('is-closing');
        $this.removeClass('is-opened');
        $links.removeClass('is-opened');
        setTimeout(() => {
          $links.removeClass('is-closing is-active');
        }, 130);
      } else {
        $this.addClass('is-opened');
        $links.addClass('is-opened');
        setTimeout(() => {
          $links.addClass('is-active');
        }, 130);
      }
    }
  });

  const emailCheck = function(email) {
    var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if(!regex.test(email)) {
        return false;
    }else{
        return email;
    }
  }

  $('.global-footer-subscribe__form-submit').on('click', function(){
    $notifyForm = $(this).closest('.global-footer-subscribe__form');
    let email = $notifyForm.find('.global-footer-subscribe__form-input').val();
    let app = 'pro';

    let check = emailCheck(email);

    if( check != false ) {
      let url,
          status = 'subscribed';
          referral = 'free-trial';
          url = "/subscribtions/subscribe.php";

      $notifyForm.find('.global-footer-subscribe__form-input').addClass('is-done');
      setTimeout(() => {
        $notifyForm.find('.global-footer-subscribe__form-submit').addClass('is-process');
      }, 60)

      $.ajax({
        method: "POST",
        url: url,
        contentType : 'application/json',
        data: JSON.stringify({ email: email, referral: referral, app: app, status: status }),
        success: function(data) {
          $notifyForm.find('.global-footer-subscribe__form-submit').removeClass('is-process').addClass('is-done');
        }
      });
    } else {
      $notifyForm.addClass('is-false');
      setTimeout(() => {
        $notifyForm.removeClass('is-false');
      }, 550);
    }

    return false;
  });
});