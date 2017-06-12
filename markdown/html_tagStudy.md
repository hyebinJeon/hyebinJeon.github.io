6월 3일 수업정리


- 링크거는 태그 : 
```
<a href ="주소">링크이름</a>
```
- 이미지거는 태그 : 
```
<img alt="설명" src="경로" />
```

<h1>html</h1>
<h2> id </h2>

스타일을 지정 할 때 한 가지만 지정해서 쓰는 이름이다.
id에 이름을 저장했을 때
1) 그 이름은 html 문서 안에서 무조건 절대적으로 하나만 있어야 합니다.
2. block요소와 inline요소 둘 다 사용이 가능합니다.
3. id가 있는 태그(요소)를 선택 할 때 앞에 무조건 (#)을 찍어 주셔야 합니다.

ex> <a id="name">___</a>
name은 영문으로 써야 함.
_ , $이외에는 특수문자 사용x.
첫글자 숫자 사용x.
첫글자는 영문자 소문자로 사용해야함.
띄어쓰기 하면 안 됨. - 쓸 수 있는 경우 : CamelCase(주로id이름), Snake_case(주로class이름), snake-case(주로 아이콘이름) 


<h2> class </h2>
* class: 
그룹으로 묶어서 스타일을 지정할 때 쓰는 이름이다. 반복적으로 사용 가능.
class에 이름을 저장했을 때
1) 동일한 이름을 가진 태그(요소)에 대해 동일한 스타일을 지정할 수 있습니다.
2) block요소와 inline요소 둘 다 사용이 가능합니다.
3) class가 있는 태그(요소)를 선택 할 때 앞에 무조건 (.)를 찍어 주셔야 합니다.

<h2> table </h2>
<table></table>태그로 묶어준다.
<table summary="부연설명"> - html5는 summary를 사용하진 않음
<caption>제목</caption>

table 만드는법
```
<body>
<table summary="표만들어보기“>  : 표 설명
<caption>간단한표</caption>    : 표제목
<tr> : 줄선
<th> : 표의 항목 제목
<td> : 셀데이터
</table>
</body>

- <style>에서 표 속성 설정
<style>table, tr, td, th{
border; 1px; solid black; 
border-spacing:0; 
border-collapse: collapse;}
</style>
```

1. colspan : 가로를 병합할때사용
합칠칸에 따라 colspan = "2"라고 입력

2. rowspan="2" 이면 세로 병합 2개