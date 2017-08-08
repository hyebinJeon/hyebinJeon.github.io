// slide_button.js

(function($) {
	/* 
   1. .me_link이름을 .slide_btn>ul에 적용
   2. .slide_btn>ul>li의 가로값을 세로에도 적용(가로 == 세로)
*/

// 1 
// show /hide  - fadeIn/fadeOut - slideDown/slideUp 
// addClass/removeClass
var slide_btn = $('.slide_btn');
var slide_ul = slide_btn.children('ul');
var slide_li = slide_ul.children('li');
var slide_button = $('.slide_btn').find('button');
var slide_icon = slide_button.find('i');

slide_ul.addClass('me_link');


$('.slide_btn>ul').addClass('me_link');

// 2
// .slide_btn>ul>li의 가로값
var slide_li_width = $('.slide_btn>ul>li').width();
$('.slide_btn>ul>li').height(slide_li_width);

slide_btn.addClass('leftMove');

//click하면 다시 나와라
slide_button.on('click',function(e){
  e.preventDefault();

  var slide_left = parseInt(slide_btn.css('left')); //parseint 정수화
  //var slide_check = slide_btn.is('.leftMove');
  //console.log(slide_check);
  //hasClass() : class이름의 존재 유무를 판단(trule/false)
  //is()       : class분 아니라 다른 내용도 판단 가능-> 나중에 if()괄호 부분에 써서 참이면 뭐해라 거짓이면 뭐해라 할 때 이용할 수 있음

  if(slide_left < 0)
    {slide_btn.removeClass('leftMove',500);
    slide_icon.removeClass('fa-arrow-right').addClass('fa-arrow-left');//버튼 화살표
    slide_button.find('span').text('닫기');}
    else{slide_btn.addClass('leftMove',500);
    slide_icon.removeClass('fa-arrow-left').addClass('fa-arrow-right');//버튼 화살표
    slide_button.find('span').text('열기');
    }

});//on


//버튼 화살표 만들기
  //1. if문을 이용하여 이모티콘 만들기

  //2. 열기 글자와  닫기글자 기능 토글
    //text() : 글자만 인지
    //html() : 요소까지 포함(요소 코드로 작성하지 않으면 글자로 인지)



  //3. 버튼에 마우스 올렸을 경우 .slide_btn이 살짝나오기
  var timed = 500;
  slide_button.on('mouseenter', function(event){
    event.preventDefault();
    slide_btn.css({'transform':'translateX(0)', 'transition':'all'+timed+'ms'});
  });
  slide_button.on('mouseleave', function(event){
    event.preventDefault();
    slide_btn.css({'transform':'translateX(0)', 'transition':'all'+timed+'ms'});
  });

})(this.jQuery);

