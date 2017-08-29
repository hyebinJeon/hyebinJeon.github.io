/*scrollFix.js*/
(function($){
  //adBanner값 화면에 맞추기
  var winH = $('html').innerHeight();
  console.log(winH);

  var headH = $('#headWrap').innerHeight();
  console.log(headH);

  $('#adBanner').height(winH-headH);

  //headBox위치
  var headOffset = $('#headBox').offset().top;
  //console.log(headOffset);

  //scroll위치
  $(window).on('scroll',function(){
    var scT = $(this).scrollTop();
    //console.log(scT);

    if(headOffset <=scT){
      $('#headWrap').addClass('fixedTop');
    }
    else{
      $('#headWrap').removeClass('fixedTop');
    }
  }); //스크롤의 위치와 headBox위치가 일치하면(보다 더 크거나 같으면) headBox를 상단에 고정
  //스크롤 위치와, headBox의 위치가 일치하지않으면(보다작으면)  #(headWrap{position:fixed; top:0; left:0;}) headBox의 위치를 원래 위치로 돌아가게 만들기

  

})(this.jQuery);