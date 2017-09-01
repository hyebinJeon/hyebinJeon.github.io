/*page_XY.js*/
(function($){
  //page-x, page-y
  //event.pageX, event-pageY
  //.on('mousemove')
  //document로 해도됨(wrap대신)
  $('#wrap').on('mousemove',function(e){
    var pagex = e.pageX;
    var pagey = e.pageY;
    var winW = $(window).width();

    //x좌표와 y좌표표를 확인
    $('.x').children('span').text(pagex);
    $('.y').children('span').text(pagey);

    //사용하려는 좌표는 모니터의 크기에따라 달라지게 된다.
    //모두 동일한 환경으로 세팅
    //0~100
    //마우스좌표 / 내가가진 브라우저 화면의 가로값 *100
    //사용할 크기 / 기준크기 * 100 ->vw, vh계산 가능  
    var myX = pagex / winW * 100;
    var myY = pagey / winW * 100;

    //parseInt() => 정수로 전환
    //Math.random(0~1까지 랜덤 숫자)
    //Math.ceil() => 내림
    //Math. round() =>반올림
    
    //변경된 수치값 체크
    $('.x').children('span').text(myX);
    $('.y').children('span').text(myY);


    $('.x').children('span').text(myX);
    $('.y').children('span').text(myY);

    $('.my_box').css({'transform':"translateX("+ myX +"px)"+"translateY("+ myY +"px)"});

  })//on
})(this.jQuery);