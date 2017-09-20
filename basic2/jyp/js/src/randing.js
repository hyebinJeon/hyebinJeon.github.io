//randing.js
(function($){
  var newsOffset = $("#newsWrap").offset().top;
  console.log(newsOffset);
  var artistOffset = $("#artistWrap").offset().top;
  var snsOffset = $("#snsWrap").offset().top;
 
  $(window).on('scroll',function(e){
    e.preventDefault();
    var winOffset = $(this).scrollTop();
    console.log(winOffset);
    
    if(winOffset >= newsOffset-700){
      $('.h2Box').addClass('addView');
      $('.newsBox').removeClass('default');
      $('.newsBox').addClass('addView');
    }else{
      $('.h2Box').removeClass('addView');
      $('.newsBox').removeClass('addView');
      $('.newsBox').addClass('default');
    };

    if(winOffset >= artistOffset-700){
      $('#artistWrap').find('.h2Box').addClass('addView');
      $('#artistBox').removeClass('default');
      $('#artistBox').addClass('addView');
    }else{
      $('#artistWrap').find('.h2Box').removeClass('addView');
      $('#artistBox').removeClass('addView');
      $('#artistBox').addClass('default');
    };

    if(winOffset >= snsOffset-600){
      $('#snsWrap').find('.h2Box').addClass('addView');
      $('#snsBox').removeClass('default');
      $('#snsBox').addClass('addView');
    }else{
      $('#snsWrap').find('.h2Box').removeClass('addView');
      $('#snsBox').removeClass('addView');
      $('#snsBox').addClass('default');
    };

  })//on
})(this.jQuery);