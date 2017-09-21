//gnb.js
(function($){
  var gnb = $("#gnbLogo").children('a');
  var gnbBox = $("#gnbBox")

  gnbBox.show();

  gnb.on('click',function(e){
    e.preventDefault(); 
    gnbBox.toggle();
  });//click

  var gnbpbox = $('.gnbpBox');
  var about = $('.company');
  var artist = $('.artist');
  var actor = $('.actor');
  var audition = $('.audition');
  
  gnbpbox.addClass('nomal');

  about.on('mouseenter',function(e){
    e.preventDefault();
    gnbpbox.addClass('companyP');
  });//mouseenter
  about.on('mouseleave',function(e){
    e.preventDefault();
    gnbpbox.removeClass('companyP');
  });//mouseleave

 artist.on('mouseenter',function(e){
    e.preventDefault();
    gnbpbox.addClass('artistP');
  });//mouseenter
  artist.on('mouseleave',function(e){
    e.preventDefault();
    gnbpbox.removeClass('artistP');
  });//mouseleave

actor.on('mouseenter',function(e){
    e.preventDefault();
    gnbpbox.addClass('actorP');
  });//mouseenter
  actor.on('mouseleave',function(e){
    e.preventDefault();
    gnbpbox.removeClass('actorP');
  });//mouseleave

  audition.on('mouseenter',function(e){
    e.preventDefault();
    gnbpbox.addClass('auditionP');
  });//mouseenter
  audition.on('mouseleave',function(e){
    e.preventDefault();
    gnbpbox.removeClass('auditionP');
  });//mouseleave

})(this.jQuery);