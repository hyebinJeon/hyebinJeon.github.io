/*menuPage.js*/
(function($){
var tabMenu = $('.tab_menu');
var tabCon = $('.tab_content');

tabMenu.children('li').on('click',function(e){
  e.preventDefault();
  var _$this = $(this);

  var tab_index = _$this.index();

  tabCon.children('ul').eq(tab_index).siblings().css({'display':'none'});
  tabCon.children('ul').eq(tab_index).css({'display':'block'});
});//on
})(this.jQuery);