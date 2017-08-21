/*modal_01.js*/
(function($){
//addClass 다수처리를 위한 함수생성 
var ModalOff = function(display){
$('.modal_box, .modal_bg').addClass(display);
};//ModalView

//removeClass 다수처리
var ModalOn = function(display){
  $('.modal_box, .modal_bg').removeClass(display);
};//ModalOff

//modal창 초기 사라지기
ModalOff('modal_dp');

//ModalOn('modal_dp');

  $('.modal_bg').on('click',function(){
    ModalOff('modal_dp');
  });//on

//
var galleryBox = $('.gallery_list');
var gallery_list = galleryBox.children('li');

gallery_list.on('click', function(e){
  e.preventDefault();
  ModalOn('modal_dp')
});//on

//이미지 넣기 ++++++++++++++++++++++++++


var url = '../img/gallery/';

var image = [
  {
    'small' : {'img':'j01.jpg' , 'alt':'1번째 사진'},
    'big' : {'img': 'j01_big.jpg' , 'alt':'1번째 큰 사진'}
  },
  {  
    'small' : {'img':'j02.jpg' , 'alt':'2번째 사진'},
    'big' : {'img': 'j02_big.jpg' , 'alt':'2번째 큰 사진'}
  },
  {
    'small' : {'img':'j03.jpg' , 'alt':'3번째 사진'},
    'big' : {'img': 'j03_big.jpg' , 'alt':'3번째 큰 사진'}
  },
  {  
    'small' : {'img':'j04.jpg' , 'alt':'4번째 사진'},
    'big' : {'img': 'j04_big.jpg' , 'alt':'4번째 큰 사진'}
  },
  {
    'small' : {'img':'j05.jpg' , 'alt':'5번째 사진'},
    'big' : {'img': 'j05_big.jpg' , 'alt':'5번째 큰 사진'}
  },
  {  
    'small' : {'img':'j06.jpg' , 'alt':'6번째 사진'},
    'big' : {'img': 'j06_big.jpg' , 'alt':'6번째 큰 사진'}
  },
  {
    'small' : {'img':'j07.jpg' , 'alt':'7번째 사진'},
    'big' : {'img': 'j07_big.jpg' , 'alt':'7번째 큰 사진'}
  },
  {  
    'small' : {'img':'j08.jpg' , 'alt':'8번째 사진'},
    'big' : {'img': 'j08_big.jpg' , 'alt':'8번째 큰 사진'}
  }
];

var i = 0;
var imageLength = image.length;
var imageSrc,imageAlt;
var button = gallery_list.children('button');

for(; i<imageLength; i++){

imageSrc = url+image[i].small.img;
imageAlt = image[i].small.alt;

button.eq(i).find('img')
      .attr({'src':imageSrc, 'alt':imageAlt});
};//for

var BigSrc, BigAlt;

var modal_box = $('.modal_box');
BigSrc = url+image[0].big.img;
BigAlt = image[0].big.alt;
modal_box.find('img').attr({'src':BigSrc, 'alt':BigAlt});

gallery_list.on('click',function(e){
  e.preventDefault();

  var _this = $(this);
  var _this_index = _this.index();

  BigSrc = url + image[_this_index].big.img;
  BigAlt = image[_this_index].big.alt;
  modal_box.find('img').attr({'src':BigSrc,'alt':BigAlt});
  modal_box.css({'backgroundPosition':'center',
                  'backgroundSize':'cover'});
});//on

})(this.jQuery);