//artist.js
(function($){
var liT = $("#artistBoxT").find('li');
var liB = $("#artistBoxB").find('li');
var p = $("#artistBox").find('p');

  p.show();

liT.on('mouseenter',function(e){
  e.preventDefault();
  var $this = $(this);
  var i = $this.index();
  liT.eq(i).children('p').hide();
});//on

liB.on('mouseenter',function(e){
  e.preventDefault();
  var $this = $(this);
  var i = $this.index();
  liB.eq(i).children('p').hide();
});//on

liT.on('mouseleave',function(e){
  e.preventDefault();
  p.show();
});

liB.on('mouseleave',function(e){
  e.preventDefault();
  p.show();
});

})(this.jQuery);