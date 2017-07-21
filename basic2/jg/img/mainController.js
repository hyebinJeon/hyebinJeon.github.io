var pageSize = 8;
var ctgryId = fnGetUrlParameter("ctgryId");
var parameters = {sPage : 0, ePage : pageSize, IL_CTGRY_ID : ctgryId };
var bestParams = {N_sPage : 0, N_ePage : 8, IL_CTGRY_ID : "50"}; //카테고리 초기화
var bbsParams = {csId : 1};

$(function(){
    
    fnGetBanner( [36,37,64,65,105] , mainBanner ); //배너 상단36 상단띠37 브랜드관64 하단 레시피65
    
    //기획전 배너
    //fnGetPromotionBanner([88]); 				//중간기획전88
    fnSetTemplate('dvPromotionBannerTemplate' , $("#dvPromotionBannerTemplate") );
    fnSetTemplate('dvIndiactorBannerTemplate' , $("#dvIndiactorBannerTemplate") );
    
    //상품리스트
	fnSetTemplate('dvComnItemTemplate', $("#dvComnItemTemplate"));
    
    //베스트
    fnSetTemplate('dvBestTemplateFrame', $("#dvBestTemplateFrame"));
    initEvent();
    getBestData();
	/*
    //기획전 리스트 - 배너로 대처하는 중
    
    */
    fnSetTemplate('dvPromotionTemplateFrame', $("#dvPromotionTemplateFrame")) ;
    fnSetTemplate('dvPromotionTemplate', $("#dvPromotionTemplate")) ;
    fnSetTemplate('dvSmallPromotionTemplate', $("#dvSmallPromotionTemplate")) ;
    getPromotionData();

    //개인화
    fnSetTemplate('dvIndvTemplateFrame', $("#dvIndvTemplateFrame"));
    getIndvData();
    
    //공지사항
	getMainBbsList();
	
	getDpPopup('');
});

function mainBanner(){
    
}

function getBestData(){
    if( $('.dvSortByCtgryItem[dvCtgryId="'+bestParams['IL_CTGRY_ID']+'"]').length > 0 ){
        $('#dvBestGoodsList .dvSortByCtgryItem').hide();
        $('#dvBestGoodsList .dvSortByCtgryItem[dvCtgryId="'+bestParams['IL_CTGRY_ID']+'"]').show();
    }else{
        fnAjax({
            url : '/biz/event/getGoodsBest'
            ,params : bestParams
            ,overlap : true
            ,success : function (data){
                total = data.total;
                fnDataBind( 'dvBestTemplateFrame', data, $('#dvBestGoodsTmp')); 
                $.each(data.rows.data, function(){
                       fnDataBind( 'dvComnItemTemplate', this , $('#dvBestGoodsTmp #dvBestBindingArea'));
                });
                $('#dvBestGoodsList .dvSortByCtgryItem').hide();
                $('#dvBestGoodsList').append( $('#dvBestGoodsTmp .dvSortByCtgryItem'));
                if(total == 0){
                    $("#dvMoveBtn").css("display","none");
                }else{
                    $("#dvMoveBtn").css("display","");
                }
            }
        });
    }
}

function fnGetPromotionBanner(bannerPosition) {
    fnAjax({
        url : '/comn/dp/banner/getDpBanner',
        params : {
            ST_CLASSIFICATION_ID_2DEPTH : JSON.stringify(bannerPosition)
        },
        overlap : true,
        success : function(data) {
            if (data.rows.length > 0) {
                $.each(data.rows, function(i, banner) {
                    if( banner.detail.length > 0 ){
                        var detail;
                        if (banner.data.BANNER_TYPE == 'B') {//기본
                            detail = banner.detail[0];
                        } else {
                            detail = banner.detail;
                        }
                        fnDataBind('dvPromotionBannerTemplate', {
                            INFO : banner.data,
                            DETAIL : detail
                        } , $('#dvPrmtnBindingArea'));
                         fnDataBind('dvIndiactorBannerTemplate', {
                            INFO : banner.data,
                            DETAIL : detail
                        } , $('#bx-pager'));
                    }
                });
            }
        }
    });
}

function getPromotionData(){
	fnAjax({
        url : '/biz/event/getPromotions'
        ,params :{"frontChk" : "Y"}
        ,success : function (data){		
        	 $.each(data.rows, function(){				
                   fnDataBind('dvPromotionTemplate', this, $('#dvPrmtnBindingArea'));
                   fnDataBind('dvSmallPromotionTemplate', this, $('#bx-pager'));
             });
        }
    });
}

function getIndvData(){
    fnAjax({
        url : '/biz/mypage/wishlist/getBestItemList'
        ,params : {'length': 5, 'subListType': 'Recom', 'pageName': 'mainPage'}
        ,success : function(data){

        	if(data.AGE != undefined || data.AGE != null){
				$('#dvIndivAge').text(data.AGE +"대 "+data.GENDER+ "들이 많이 구매한 상품");
			}else{
				$('#dvIndivAge').text("고객님을 위한 상품");
			}
			fnDataBind( 'dvIndvTemplateFrame', data, $('#dvIndvGoodsList'));
			
			//initEvent();
			$.each(data.recomRows, function(i){
				if(i <= 3){
					fnDataBind( 'dvComnItemTemplate', this , $('#dvIndvBindingArea'));
				}
            });
            
            runAfterDataBind();
        }   
    });
}

function getMainBbsList (){
	fnAjax({
		url : '/biz/cs/bbs/getBbsList'	
		,params : bbsParams
		,success : function(data){
			if(data.rows[0] != null){
				$('#dvBbsTitle1').text(data.rows[0].TITLE);
				$('#dvBbsDate1').text(data.rows[0].CREATED);
				$('#dvBbsTitle2').text(data.rows[1].TITLE);
				$('#dvBbsDate2').text(data.rows[1].CREATED);
				
				$('#dvBbsTitle1').attr('href', "/csCenter/notice/notice?ID="+data.rows[0].ID);
				$('#dvBbsTitle2').attr('href', "/csCenter/notice/notice?ID="+data.rows[1].ID);
			}else{
				$('#dvBbsTitle1').text('등록된 내용이 없습니다.');
				$('#dvBbsDate1').text('');
				$('#dvBbsTitle2').text('등록된 내용이 없습니다.');
				$('#dvBbsDate2').text('');
			}
		}	
	});
}

function initEvent(){
    $('.dvSortByCtgry').on('click',function(){
        bestParams['IL_CTGRY_ID'] = $(this).attr('dvCtgryId');
        bestParams['N_sPage'] = 0;
        getBestData();
    });
    $('.dvSortByCtgry').on({
        'mouseenter' : function (){
            if (!$(this).hasClass('click')) {
                $(this).addClass('active');
            }
        }
        ,'mouseleave' : function (){
            if (!$(this).hasClass('click')) {
                $(this).removeClass('active');
            }
        }
        ,'click' : function (){
            fnOnOff(this);
        }
    });
};

function fnOnOff(item){
	$('.dvSortByCtgry').each(function(){
		if($(this).attr("dvCtgryId") != $(item).attr("dvCtgryId")){
			$(this).removeClass('active');
			$(this).removeClass('click');
		}
	});
	$(item).addClass('active');
	$(item).addClass('click');
}

function fnMoveToCtgry(){
    var ctgry = bestParams['IL_CTGRY_ID'];
    if(ctgry == 0 || ctgry == null || ctgry == '' || ctgry == 'undefined'){
		location.href = "/event/goodsBest";
	}else{
        fnAjax({
                 url : '/biz/shop/getGoodsList'
                ,params : { IL_CTGRY_ID : ctgry }
                ,success : function (data){
                    location.href = "/shop/goodsList?ctgryId="+bestParams['IL_CTGRY_ID'];
                }
         });
    }
}
