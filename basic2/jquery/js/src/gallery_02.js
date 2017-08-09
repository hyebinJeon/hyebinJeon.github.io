/*gallery_01.js*/
(function($){
//++++++++++++++++++++++++++++++++++++++++++++
  var galleryBox = $('.gallery_box');
  var galleryList = $('.gallery_list');
  var gallery_li = galleryList.children('li');
  var timed = 500;
// 큰이미지는 작은 섬네일 파일의 이름 뒤에 _big이름이 추가로 포함된다.
// ../img/gallery/j02.jpg => ../img/gallery/j02_big.jpg

// gallery_li 클릭
gallery_li.on('click', function(e){
  e.preventDefault();
  var _this = $(this);
  var _imgSrc = _this.find('img').attr('src');
  var _imgAlt = _this.find('img').attr('alt');
  var _imgBox = galleryBox.find('img');

  //console.log('사용된 이미지는:', _imgSrc);
  //console.log('이미지에 대한 내용은:', _imgAlt);

  var _cut = _imgSrc.slice(0, -4);
  var _textPlus = _cut + '_big.jpg';
  console.log(_textPlus);


  _imgBox.attr('src', _textPlus);

});//on

//++++++++++++++++++++++++++++++++++++++++++++
})(this.jQuery);