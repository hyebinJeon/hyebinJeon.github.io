/*page_XY_02.js*/
(function($){
  //window width을 확인
  //마우스 이동
  //이동시, x,y값 파악
  //좌표 값을 일정한 크기로 제한(100 값으로 제한)
  //해당값을 이미지태그를 생성한후
  //해당값을 이미지의 파일명과 합쳐서 처리

  $('.my_img').on('mousemove',function(e){
  
  var imgWidth = $('.my_img').innerWidth();
  var pagex = e.pageX;
  var imgOffsetLeft = $('.my_img').offset().left;

  var myPagex = parseInt( (pagex - imgOffsetLeft) / imgWidth * 100);

  $('.my_img').html('<img>');
  var useImg = $('.my_img').find('img');

  var url = '../img/page_xy/';
  //useImg.attr({src:url + ' '});
  useImg.attr({src:url+'pageImg_'+myPagex+'.jpg', 
              alt:'page x,y 값을 사용한 이미지테스트'});
  //var winW = $(window).innerWidth();
  $('p').find('span').text(url + 'pageImg_' + myPagex + '.jpg');
  });

})(this.jQuery);