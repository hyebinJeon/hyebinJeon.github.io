//gulfile.js

var gulp = require('gulp');
var sass = require('gulp-sass');
var sync = require('browser-sync').create();

//--기본경로
var url = {before:"./public/src", after:'./public/dist'};
var path = {
  sass:{
    src: url.before + '/scss/**/*.scss',
    dist: url.after + '/css'
  }
};

// sass 설정
gulp.task('sass', function () {
  return gulp.src(path.sass.src)
             .pipe(sass.sync().on('error', sass.logError))
             .pipe(gulp.dest(path.sass.dist));
});

//서버생성(browser-sync) ---------------------------------
gulp.task('sync',function(){
  sync.init({
    port:1224,
    server:{
      baseDir:url.after
    }
  });
});

//실시간 감지++++++++++++
gulp.task('watch', function () {
  gulp.watch(path.sass.src, ['sass']);
});

//gulp명령어를 입력하면 바로 수행하는 기능+++++++++++++
gulp.task('default',['sync','sass','watch']);


//func: gulp.task의 기능을 수행(함수)
//gulp.src() //원본의 위치
//.pipe() 메소드를 연결하여 수행하기 위한 기능
//gulp.dest() // 결과의 위치
//gulp.watch('변화를 감지할 위치, [처리할 task'])//실시간으로 감지해서 변화를 처리하도록
