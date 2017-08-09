/*gallery_01.js*/
(function($){
//++++++++++++++++++++++++++++++++++++++++++++
  var galleryBox = $('.gallery_box');
  var galleryList = $('.gallery_list');
  var gallery_li = galleryList.children('li');
  var timed = 500;


// gallery_li 클릭
gallery_li.on('click', function(e){
  e.preventDefault();
  var _this = $(this);
  //console.log(_this);
  //console.log( _this.index());
  //console.log( _this.attr('data-src') );
  //console.log( _this.attr('data-alt') );

  //galleryBox에 들어있는 속성src 값을 선택되었던 li속성 data-src값으로 변경
  var _mySrc = _this.attr('data-src'),
      _myAlt = _this.attr('data-alt');
 
 galleryBox.find('img').attr({'src':_mySrc, 'alt':_myAlt});


});//on

//++++++++++++++++++++++++++++++++++++++++++++
})(this.jQuery);