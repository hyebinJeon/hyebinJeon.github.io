(function($){

var adBanner = $('#adBanner');
var adBannerUl = $('#adBannerLi');
var adBannerLi = adBannerUl.children('li');
var button = $('#button');
  var button_l = button.children('.button_L');
  var button_r = button.children('.button_R');


adBannerUl.css({marginLeft:-100+'%'});

var li_last = adBannerLi.last();
adBannerUl.prepend(li_last);

button_r.on('click',function(e){
  // e.preventDefault();

  adBannerUl.animate({marginLeft:-200+'%'},function(){
    adBannerLi = adBannerUl.children('li');
    li_first = adBannerLi.first();
    adBannerUl.append(li_first);
    adBannerUl.stop().css({marginLeft:-100+'%'});
  });
});//on

button_l.on('click',function(e){
  // e.preventDefault();

    adBannerUl.animate({marginLeft:0},function(){

      adBannerLi = adBannerUl.children('li');
      li_last = adBannerLi.last();
      adBannerUl.prepend(li_last);
      adBannerUl.stop().css({marginLeft:-100+'%'});
    });
});//on

adBanner.css({overflow:'hidden'});

})(this.jQuery);