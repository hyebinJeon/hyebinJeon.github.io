//gnb.js
(function($){
  var gnb = $("#gnbLogo").children('a');
  var gnbBox = $("#gnbBox")

  gnbBox.show();

  gnb.on('click',function(e){
    e.preventDefault(); 
    gnbBox.toggle();
  });//click
})(this.jQuery);