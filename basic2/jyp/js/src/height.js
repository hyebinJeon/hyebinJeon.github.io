//height.js
var snsListA = $('#snsList').children('li').children('a');
var snsListP = snsListA.find('p');
var snsListH = snsListA.height();
// console.log(snsListH);

snsListP.css({'lineHeight':snsListH+'px'});


var innerBox = $('#innerBox')
var innerBox_h2 = innerBox.children('h2');
var innerBoxH = innerBox.height();

innerBox_h2.css({'lineHeight':innerBoxH+'px'});