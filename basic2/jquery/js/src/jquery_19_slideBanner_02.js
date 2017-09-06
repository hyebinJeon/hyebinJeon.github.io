/*jquery_19_slideBanner_02.js*/
(function($) {
  //1. slide indicator를 통해 배너가 움직이도록 처리
  //2. 좌,우 버튼을 클릭해서 배너가 움직이도록 처리
  //3. 좌,우 버튼을 클릭시 indicator도 같이 처리

// 1번기능 - 좌,우 버튼 임시로 숨김
// $('.slide_btn').hide();


  //indicator클릭시 해당하는 값 이동
  var indi = $('.indicator');
  var indi_li = indi.children('li');
  var banner = $('#bannerBox');
  var bannerChild = banner.children('li');
  var bannerlength = bannerChild.length;

  indi_li.on('click',['button'],function(e){
    e.preventDefault();
    var _this = $(this);
    var _thisEq = _this.index();

    banner.animate({marginLeft:_thisEq*-100+'%'});
    indi_li.eq(_thisEq).addClass('active').siblings().removeClass('active');
  })//on

// 2번 좌우 기능을 위해 indicator 임시로 숨김
indi.hide();
  var btn = $('.slide_btn');
  var l_btn = btn.children('.l_btn');
  var r_btn = btn.children('.r_btn');
  var i = 0;


  l_btn.on('click',function(e){
    i += 1;
    banner.animate({marginLeft: i*100+'%'});
    if(i == 0){
      l_btn.hide();}
      else{l_btn.show();
          r_btn.show();}

  });//on

  r_btn.on('click',function(e){
    e.preventDefault();    
    i -= 1; 
    console.log(i);
    banner.animate({marginLeft: i*100+'%'});

    if(-i == bannerlength-1){
      r_btn.hide();}
      else{l_btn.show();
        r_btn.show();}

  });//on




})(this.jQuery);