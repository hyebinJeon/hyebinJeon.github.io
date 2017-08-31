/*randing_01.js*/

(function($){
  //스크롤이벤트 사용

  //landig_02
  //#content_02위치를 파악
var conOffset = $('#content_02').offset().top;

//------------------------------------------------------------------
  $(window).on('scroll',function(){
    //offset().top 500만큼 이동하면 
    //headBox의 높이와 배경색상을 변경처리
    //그림자를 생성
    
    var winOffset = $(this).scrollTop();
    var timed = 500;
    //var offsetTop = $("#headBox").offset().top ->만약 offsetTop쓴다면? 이렇게쓴다.
    console.log(winOffset);

    if(winOffset>=500){
      $('body').addClass('scroll',{duration:timed});
      $('#headBox').addClass('scroll',{duration:timed});
      $('#headBox').children().addClass('scroll',{duration:timed});
    }
    else{
      $('body').removeClass('scroll',{duration:timed});
      $('#headBox').removeClass('scroll',{duration:timed});
      $('#headBox').children().removeClass('scroll',{duration:timed});
    }


//content_02내부 이미지 나타나게 만들기
    if(winOffset >= (conOffset - 300) ){
  $('.one').addClass('addView');
  $('.two').addClass('addView');
  }
  });//on

//-------------------------------------------------





})(this.jQuery);

//우리가 주로사용하는 영역은 document -DOM
//하지만, $(window)는 자바스크립트 상에서  window객체 document보다 더 큰 범위 브라우저 그 자체(x버튼, 최소화버튼) - BOM