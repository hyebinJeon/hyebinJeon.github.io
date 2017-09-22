//topButton.js
(function($){
var topButton = $('#topButton');
topButton.on('click',function(e){
  e.preventDefault();
  $('body,html').animate({scrollTop:0}, 500);
});
})(this.jQuery);