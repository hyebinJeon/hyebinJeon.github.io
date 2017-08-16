/*menuSlide.js*/
(function($){

	var gnb = $('.menuBox');
	var gnbLi = gnb.find('li');
	var gnbOl = gnbLi.find('ol');
	gnbOl.hide();




	gnb.on('mouseenter',function(e){
		e.preventDefault();
		gnbOl.stop().slideDown();
	});/*on*/

	gnb.on('mouseleave', function(e){
		e.preventDefault();
		gnbOl.stop().delay(100).slideUp();
		});

})(this.jQuery);