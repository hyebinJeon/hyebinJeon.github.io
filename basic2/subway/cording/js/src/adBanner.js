/*adBanner.js*/
(function($){

var bannerBox = $('#adbannerBox');
var banner_group = bannerBox.children('ul');
var btn = $('.adButton');
var btn_l = btn.children('button:first');
var btn_r = btn.children('button:last');
var timed = 500;

bannerBox.css({overflow:'hidden'});
banner_group.children('li').show();

var li_last = banner_group.children('li').last();
banner_group.prepend(li_last);

btn_r.on('click',function(e){
  e.preventDefault();

  banner_group.stop().animate({marginLeft:'-200%'},timed, function(){
    var li_fr = banner_group.children('li').first();
    banner_group.append(li_fr); //그룹의 마지막li로 들어가라
    banner_group.children('li').show();
    banner_group.css({marginLeft:-100+'%'});
  });//function
});//.on

btn_l.on('click',function(e){
  e.preventDefault();
  banner_group.stop().animate({marginLeft:'0'},timed, function(){
    var li_la = banner_group.children('li').last();
    banner_group.prepend(li_la); //그룹의 첫번재li로 들어가라
    banner_group.css({marginLeft:-100+'%'});//틀유지
  });//function
});//.on

})(this.jQuery);//