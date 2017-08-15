
(function($) {
	var galleryBox  = $('.gallery_box');
	var galleryList = $('.gallery_list');
	var gallery_li  = galleryList.children('li');

	gallery_li.on('click', function(e){
		e.preventDefault();
		var _this = $(this);
		var _imgSrc = _this.find('img').attr('src');
		var _imgAlt = _this.find('img').attr('alt');
		var _imgBox = galleryBox.find('img');


		var _cut = _imgSrc.slice(0, -4);
		var _textPlus = _cut + '_big.jpg';
		// console.log(_cut);
		console.log(_textPlus);

		_imgBox.attr('src', _textPlus);

	});
  
})(this.jQuery);

