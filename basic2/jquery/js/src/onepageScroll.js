/*onepageScroll.js*/
(function($){
  var nav = $('#gnb');
  var nav_a = nav.find('a');

  nav_a.on('click',function(e){
    e.preventDefault();
    $('html, body').animate({scrollTop:$(this.hash).offset().top},500);

  })//on
})(this.jQuery);