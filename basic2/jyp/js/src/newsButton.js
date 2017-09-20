//newsButton.js
(function($){
  var button = $(".newsBox").children('li').children('button');
  var image = $(".newsBox").children('li').children('div');

  button.on('mouseenter',function(e){
    e.preventDefault();
    var $this = $(this);
    $this.prev('div').addClass('hover');
  });//on

  button.on('mouseleave',function(e){
    e.preventDefault();
    var $this = $(this);
    $this.prev('div').removeClass('hover');
  });//on

  image.on('mouseenter',function(e){
    e.preventDefault();
    var $this = $(this);
    $this.next('button').addClass('hover');
  });//on

  image.on('mouseleave',function(e){
    e.preventDefault();
    var $this = $(this);
    $this.next('button').removeClass('hover');
  });//on

})(this.jQuery);