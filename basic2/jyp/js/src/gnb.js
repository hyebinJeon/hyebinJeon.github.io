//gnb.js
(function($){
  var gnb = $("#gnbLogo");
  var gnbBox = $("#gnbBox");

gnbBox.hide();

  gnb.on('click',function(e){
    e.preventDefault(); 
    gnbBox. slideToggle('direction:right');
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
    gnbpbox.removeClass('nomal');
  });//mouseenter
  about.on('mouseleave',function(e){
    e.preventDefault();
    gnbpbox.removeClass('companyP');
    gnbpbox.addClass('nomal');
  });//mouseleave

 artist.on('mouseenter',function(e){
    e.preventDefault();
    gnbpbox.addClass('artistP');
    gnbpbox.removeClass('nomal');
  });//mouseenter
  artist.on('mouseleave',function(e){
    e.preventDefault();
    gnbpbox.removeClass('artistP');
    gnbpbox.addClass('nomal');
  });//mouseleave

actor.on('mouseenter',function(e){
    e.preventDefault();
    gnbpbox.addClass('actorP');
    gnbpbox.removeClass('nomal');
  });//mouseenter
  actor.on('mouseleave',function(e){
    e.preventDefault();
    gnbpbox.removeClass('actorP');
    gnbpbox.addClass('nomal');
  });//mouseleave

  audition.on('mouseenter',function(e){
    e.preventDefault();
    gnbpbox.addClass('auditionP');
    gnbpbox.removeClass('nomal');
  });//mouseenter
  audition.on('mouseleave',function(e){
    e.preventDefault();
    gnbpbox.removeClass('auditionP');
    gnbpbox.addClass('nomal');
  });//mouseleave

})(this.jQuery);