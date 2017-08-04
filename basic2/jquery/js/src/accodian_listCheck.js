(function($){
var addH = $('.add_h');
var addDt = addH.find('dt');
var addDd = addH.find('dd');
  
//console.log(addDd.length);
addDt.on('click',function(e){
  e.preventDefault();
  var _this = $(this);
  //console. log(addDt.index(_this));
  var selectDt = addDt.index(_this);
  addDd.eq(selectDt).css({background:'#af0'});
});

console.log(addDd.eq(3).height());
})(this.jQuery);