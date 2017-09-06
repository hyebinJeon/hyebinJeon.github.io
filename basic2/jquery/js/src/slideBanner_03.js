// slideBanner_02.js
(function($) {
  // 1. slide indicator를 통해 배너가 움직이도록 처리
  // 2. 좌,우 버튼을 클릭해서 배너 이동 처리
  // 3. 좌,우 버튼을 클릭시 indicator도 같이 처리
  // 4. 좌, 우 버튼을 클릭시 계속 회전하도록 처리
  // 5. 일정시간마다 내용이 변경 되도록 처리
  // 6. 마우스올렸을 경우(mouseenter) 자동 변경기능이 멈추고, 벗어날경우(mouseleave) 다시 변경되도록 처리

// 좌, 우 버튼 일정 위치에서 사라지거나, 나타나게 만드는 기능을 함수화 처리
  function BtnEnd(){
    if(i <= 0){
      i = 0; 
      i = banner_i-1;
    }else if(i >= banner_i-1){
      i=banner_i-1;
    }
    console.log(i);
    banner.stop().animate({marginLeft: -i * 100 + '%'});
    indi_li.eq(i).addClass('active').siblings().removeClass('active');
  };

  // indicator클릭시 해당하는 값이 이동
  var banner = $('#bannerBox');
  var banner_child = banner.children();
  var banner_i = banner_child.length; //복제하기 전의 갯수 파악


  var lBtn = $('.l_btn');
  var rBtn = $('.r_btn');
  var i = 1;

  // 변수값보다 함수호출이 먼저되면 undefined 또는 에러를 도출
  BtnEnd(i);

//4번기능 처리++++++++++++++++++++++++++++++++++++++++++++++++
//마지막요소를 복제 
var cloneBanner = banner_child.last().clone();
cloneBanner.prependTo(banner);

banner_child = banner.children();
banner_i = banner_child.length;//복제 후 갯수를 재확인
console.log(banner_i);

//banner의 크기를 복제한 갯수 * 100%만큼 수정
banner.css({width:banner_i*100+'%'});
//banner의 자식요소또한 전체크기/갯수% 만큼으로 수정해야 한다.
banner_child.css({width:100 / banner_i + '%'});

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//banner 개수에 맞게 indicator처리 및 생성+++++++++++++++++++++++++++++++++++++
var slideBanner = $('#slideBanner');
slideBanner.append('<ol class="indicator"></ol>');
var indi = $('.indicator');
//.indicator 내부에 li값 및 button 생성(test)
var j = 0;
for(; j<banner_i; j++){
  //배너 내부이 li에 존재하는 속성 title값 가져오기
  var banner_t = banner_child.eq(j).attr('title');
indi.append('<li class="indi_'+j+'"><button><span class="hidden">'+banner_t+'</span></button></li>');
};
var indi_li = indi.children(); 
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++



// ------------ indicator 클릭
  indi_li.on('click',['button'],function(e) {
    e.preventDefault();
    var _this = $(this);
    i = _this.index();

    BtnEnd();
  });

  // 2. 좌,우 버튼을 클릭해서 배너 이동 처리
  rBtn.on('click',function() {
    i += 1;
    BtnEnd();
  });

  lBtn.on('click',function() {
    i -= 1;
    BtnEnd();
  });




})(this.jQuery);