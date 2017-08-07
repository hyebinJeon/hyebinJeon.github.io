/*accordion_02.js*/
(function($){
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//drop down 메뉴 만들기
  var gnb = $('#gnb');
  var gnbLi = $('#gnb').find('li');
  var gnbOl = gnbLi.find('ol');

  gnb //mouseenter는 마우스를 오렸을 때, mouseleave는 gnb에 벗어 났을 떄 
    .on('mouseenter',function(){
    gnbOl.stop().slideDown();
    }); //.on
  gnb
    .on('mouseleave',function(){
    gnbOl.stop().slideUp();  
  }); //.on



//아코디언 메뉴 만들기
  var conBox = $('#contentBox');
  var conBoxDl = conBox.children('dl');
  var conDt = conBoxDl.children('dt');
  var conDd = conBoxDl.children('dd');

  var ddWidth = parseInt(conDd.eq(0).width());
  var ddPdL = parseInt(conDd.eq(0).css('paddingLeft'));
  var ddPdR = parseInt(conDd.eq(0).css('paddingRight'));

  
  var ddFullWidth = conDd.eq(0).innerWidth(); //가로값 파악하기 위한것 
  
  //dt클릭 이벤트
  conDt.on('click',function(e){
    e.preventDefault();
    var _$this = $(this);
    var thisNext = _$this.next('dd');

    //선택된 dt뒤의 dd를 제외한 나머지 숨김처리
    thisNext.siblings('dd').animate({'width':0, 'overflow':'hidden'}, function(){
      var _this = $(this);
      _this.css({'display':'none'});
    });

    //선택된 DT 또 누르며 접혔다 펴지는데, 그냥 가만히 있게 하기
    var nextDdDp = thisNext.css('display');
    if(nextDdDp == 'none'){

      thisNext.css({'display':'block','width':0,'overflow':'hidden'})
            .animate({'width':ddFullWidth+'px'});

    }else{thisNext.css({'width':ddFullWidth+'px'});}//display가 none이면 펴지게 하라. 만약 block인 펴진 상태면 그대로 가만히 있어라.  

  //dl이 넘쳐서 밑으로 내려가버려서 넘치는건 숨기는 처리한다.
  conBoxDl.css({'overflow':'hidden'});
  });//Dt.on.'click'

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++
})(this.jQuery);
//innerWidth(); : width+padding 크기값 가져옴 
  //outerWidth(); : width+padding+border 크기값/ 
  //outerWidth(true); : width+padding+border+margin 크기값/ 
  //width(); : width값만 /
  //css('padding'); : padding값만