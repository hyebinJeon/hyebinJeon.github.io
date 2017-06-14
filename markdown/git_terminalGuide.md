6월 12일 git사용법,terminal용어 정리

##깃사용법##
### 순서 ###
- 처음 할 때 방법
> 1. git clone ```주소복사```
> 2. git config(동기화란의미)--global user.name ```사용자이름```
> 3. git config --global user.email ```메일주소```
> 4. git remote add origin ```주소```
> 5. 아톰으로 작업하기
> 6. cd git연결된 주소 폴더로 이동 (master가 떠야함)
> 7. git push -u origin master
> 8. 주소, 비번입력
> 9. git add ```파일이름```
> 10. git commit -m ```"코멘트"```
> 11 git push
> 12. 내 닉네임 입력
> 13. 비밀번호 입력

- 두번째 할 때 방법
> 1. cd gitmaster폴더로 이동
> 2. git add ```파일이름```
> 3. git commit -m ```"코멘트"```
> 4. git push

- 다른 사람 파일 받는 방법
> 1. 다른 사람 파일 받을 폴더 생성
> 2. 그 폴더에서 gitbash 실행
> 3. git clone ```그 사람 주소``` 
ex> https://www.github.com/
hyebinjeon/hyebinjeon.github.io.git
>4. cd로 연결된 그 사람의 github폴더로 이동 
    cd hyebinjeon.github.io
>5. git pull

기타 : 
```git status``` 현재 상태확인


---

###그 외 터미널 용어###

> 1. ``pwd``: 현재 위치 확인
2. ``cd..`` : 이전 폴더로 이동
3. ``cd /`` : 최상위 폴더로 이동
4. ``cd 폴더이름`` : 해당 폴더로 이동
5. e드라이브 폴더 안의 work폴더로 이동 : ```cd e:/work```
6. 현재 문서를 이동 : ``mv test.html study/test.html``
   test라는 파일을 study폴더로 이동한다는 뜻.
   파일이름 띄고 폴더이름``/``파일이름
7. ``mkdir`` : 폴더를 생성한다.
8. ``touch``:문서를 생성한다.
9. ``rm -rf 파일/폴더이름`` : 파일이나 폴더를 지운다.
10. ``cat 파일이름``:해당파일의 내용을 확인한다.
11. ``ls`` : 해당 폴더의 파일 리스를 확인 할 수 있음.
