/*slideBanner.js*/
(function($){
//slide banner1
//1.처음에 보이는 이미지가 첫번째로 보이기
//2.오른버튼을 클릭하면 오른쪽 이미지가 보이게 이동
//3. 여러번 클릭해도 계속 보이게 만들기
//4. 빠르게 클릭하면 메모리기능이 사라지게 되로록 처리
//5. 왼족 버튼을 클릭하면 위와 동일한 반복기능을 처리

var bannerBox = $('#addBannerBox');
var banner_group = bannerBox.children('ul');
var btn = $('.btn');
var btn_l = btn.children('button:first');
var btn_r = btn.children('button:last');
var timed = 500;

bannerBox.css({overflow:'hidden'});
banner_group.css({marginLeft:-100+'%'});//계속 눌러도 틀 유지

var li_last = banner_group.children('li').last();
banner_group.prepend(li_last);
//banner_group.prepend(li_last); //부모.prepend(자식)
//li_last.prependTo(banner_group); //자식.prependTo(부모)

btn_r.on('click',function(e){
  e.preventDefault();

  //1. 클릭시 한칸 왼쪽으로 이동 후
  //2. 맨앞의 요소를 마지막으로 이동과 동시에
  //3. 처음상태의 형태로 처리(단, 내부요소는 변경된 형태 그대로)
  banner_group.stop().animate({marginLeft:'-200%'},timed, function(){
    var li_fr = banner_group.children('li').first();
    banner_group.append(li_fr); //그룹의 마지막li로 들어가라
    banner_group.css({marginLeft:-100+'%'});//틀유지
  });//function
});//.on

btn_l.on('click',function(e){
  e.preventDefault();
  banner_group.stop().animate({marginLeft:'0'},timed, function(){
    var li_la = banner_group.children('li').last();
    banner_group.prepend(li_la); //그룹의 첫번재li로 들어가라
    banner_group.css({marginLeft:-100+'%'});//틀유지
  });//function
});//.on

//반복기능 setInterval()
setInterval(btn_r.on('click'), timed);

})(this.jQuery);//