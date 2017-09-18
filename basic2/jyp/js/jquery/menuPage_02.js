(function($) {
        var tabCon = $('.tab_content');
        var tab_1 = $('.tab_1');
        var tab_2 = $('.tab_2');
        
        $('.tab_1').children().eq(0).show(); 
        $('.tab_1').children().eq(0).siblings().hide();
        $('.tab_2').children().eq(0).show();
        $('.tab_2').children().eq(0).siblings().hide();
        $('.tab_2').children().children().eq(0).show();
        $('.tab_2').children().children().eq(0).siblings().hide();
       
        
// ---------------------------------------------------------------
        $('.tab_menu').children().on('click',function(e){
          e.preventDefault();
          var i = $(this).index();
          tab_1.children().eq(i).show();
          tab_1.children().eq(i).siblings().hide();

        $('.tab_2').children().eq(i).show();
        $('.tab_2').children().eq(i).siblings().hide();
        $('.tab_2').children().eq(i).children().eq(0).show();
        $('.tab_2').children().eq(i).children().eq(0).siblings().hide();
        });
// -----------------------------------------------------------------
        var tabUl = $('.tab_1').children();
        var li = tabUl.children('li');

// -----------------------------------------------------------
        li.on('click', function(){
          var j = $(this).parent().index();
          var i = $(this).index();
          console.log('UL:', j);
          console.log('LI:', i);
          tab_2.children().eq(j).show();
          tab_2.children().eq(j).siblings().hide();
          tab_2.children().eq(j).children().eq(i).show();
          tab_2.children().eq(j).children().eq(i).siblings().hide();          
          tab_2.children().eq(j).siblings().children().hide();
        });

    })(this.jQuery);