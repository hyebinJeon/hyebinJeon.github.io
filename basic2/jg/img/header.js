$(function(){
	
    fnGetBanner([63], horizonBanner); //상단 배너;
	
	fnSetTemplate('dvDpKwd', $("#dvDpKwd"));
	fnSetTemplate('dvTrendWord', $("#dvTrendWord"));
	fnSetTemplate('dvLatelyWord', $("#dvLatelyWord"));
	fnSetTemplate('dvLatelyNothing', $("#dvLatelyNothing"));
	fnSetTemplate('dvSmartWord', $("#dvSmartWord"));
	
	fnSetTemplate('dvCtgryDepth2', $("#dvCtgryDepth2"));
	fnSetTemplate('dvCtgrySubmenuTemplate', $("#dvCtgrySubmenuTemplate"));
	fnSetTemplate('dvCtgrySubmenuTemplate2', $("#dvCtgrySubmenuTemplate2"));
	fnSetTemplate('dvCtgryItemInfo', $("#dvCtgryItemInfo"));
	fnSetTemplate('dvCtgryItem', $("#dvCtgryItem"));
	fnSetTemplate('dvdpPopupTemplate', $("#dvdpPopupTemplate"));
	
	$('#dvLately').addClass('active');
	
	$('#dvSrhBar').val(fnGetUrlParameter('ITEM_SRH_OPT_VAL'));
	
	initHeaderEvent();
	globalNavControl();
	getHeadMenuYn();  // 헤드 메뉴 노출 여부
	getDpKwdDp();
	
	getPwCheck();
});

/* global navigation control */
function globalNavControl() {
	var $this = $('.tab-tit > a');
	$this.on('mouseover',function() {
		var dvCtgryId = $(this).attr('dvCtgryId');
		var dvDivId = $(this).attr('href').replace('#','');
		var dvCtgryName = $(this).text();
		var $thisCtgry =$(this);
		
		if ($(this).attr('load') != 'on') {
			fnAjax({
				 url     : "/comn/il/dispCtgry/getUseDispCtgrys"
				,params : {
					"IL_CTGRY_ID" : dvCtgryId
				}
				,success : function (data){
					$thisCtgry.attr('load','on');

					//$('#dvCtgryArea').empty();
					$('#dvCtgryArea .tab-cont').hide();
					
					fnDataBind('dvCtgryDepth1', { DIV_ID : dvDivId, IL_CTGRY_ID : dvCtgryId } , $('#dvCtgryArea'));					
					fnDataBind('dvCtgryItemInfo', { IL_CTGRY_ID : dvCtgryId, CTGRY_NAME : dvCtgryName } , $('#'+dvDivId));
					
					$.each(data.rows, function(i){
						if( i < 13 ){
	                		$('#dvCtgrySubmenu2'+dvCtgryId).css('display', 'none');
	                		fnDataBind('dvCtgrySubmenuTemplate', this, $('#dvCtgrySubmenu' +dvCtgryId));
	                	}
	                	if( i > 12 ){
	                		$('#dvCtgrySubmenu2'+dvCtgryId).css('display', '');
	                		fnDataBind('dvCtgrySubmenuTemplate2', this, $('#dvCtgrySubmenu2' +dvCtgryId));
	                	}
	                });
				}
			});
			
			fnAjax({
            	url : "/biz/event/getGoodsBest"
            	,params : { N_sPage : 0, N_ePage : 3, IL_CTGRY_ID : dvCtgryId }
            	,overlap : true
            	,success : function (data){
            		console.log('--> success:IL_CTGRY_ID: ')
            		$('#dvCtgryItemArea').html('');
            		$.each(data.rows.data, function(){
            			fnDataBind('dvCtgryItem', this , $('#dvCtgryItemArea'+dvCtgryId));	
            		});	                				
            	}
            });
		}else{
		    $('#dvCtgryArea .tab-cont').hide();
		    $('#dvCtgryArea #'+dvDivId).show();
		}
	});
	$this.eq(0).trigger('mouseover');
}

function initHeaderEvent(){
	$(document).on({
		click : function(){
			$('#auto_search_area').show();
			if($('#dvTrend').hasClass('active')){
				getHeaderTrend();
			}else{				
				getHeaderLately();
			}			
		},
		keyup : function(e){			
			if(e.keyCode==13){
				getHeaderSearch();
			}else{
				var params = { searchTerm : $('#dvSrhBar').val() };
			
				if(params.searchTerm.length > 0){
					$('#dvSwitchWord1').hide();
					$('#dvSwitchWord2').hide();
					$('#dvSwitchWord3').hide();
					$('#dvSwitchSmart').show();
					
					$('#auto_search_area').show();			
					$('#dvSmartWordArea').empty();
					
					getHeaderSmartMaker(params);
				}else{
					$('#dvSwitchWord1').show();
					$('#dvSwitchWord2').show();
					$('#dvSwitchWord3').show();
					$('#dvSwitchSmart').hide();
										
					$('#dvSmartWordArea').empty();
				};
			};
		},
	},'#dvSrhBar');
	
	$('#dvSrhBtn').on('click',function(){
		getHeaderSearch();
	});
	
	$('#dvTrend').on('click',function(){
		$('#dvWordDelBtn').hide();
		
		getHeaderTrend();		
	});
	
	$('#dvLately').on('click',function(){		
		$('#dvWordDelBtn').show();
		
		getHeaderLately();
	});
	
	$('#dvWordDelBtn').on('click',function(){
		
		$.each($('.dvDelCTop'),function(index){
			$(this).closest('li').remove();
		});
		
		$.each($('.dvDelCMid'),function(index){
			$(this).closest('span').remove();
		});
			
		delCookie('latelykwd');
		
		wordHeaderClear();
		fnDataBind( 'dvLatelyNothing', {}, $('#key-tab2'));
						
		$('#dvSrhBar').focus();
	});
	
	$('#dvWordCloseBtn').on('click',function(){
		$('#auto_search_area').hide();
		$('#dvSrhBar').focus();
	});
	$('html').on('click',function(e){
		if($("#auto_search_area").css("display") == "block"){
			if(!$('#auto_search_area, #dvSrhBar').has(e.target).length) {
				$('#auto_search_area').hide();
				$('#dvSrhBar').focus();
			}		
		}
		
	});
	//url 이벤트 확인
	fnAjax({
        url : '/biz/ev/eventIssue/getVisitEventUrlList'
       ,success : function (data){
    	   for(var i=0; i <data.rows.length; i++){
    		   if(location.href == data.rows[i].VISIT_URL){
    			   var eventId =data.rows[i].EV_EVENT_ID;
    			   fnAjax({
    		             url : '/biz/ev/eventIssue/addChkAttendance'
    		            ,params : {"EV_EVENT_STAMP_URL_ID" :data.rows[i].EV_EVENT_STAMP_URL_ID
    		            		   ,"EV_EVENT_STAMP_ID" : data.rows[i].EV_EVENT_STAMP_ID
    		            		   ,"EV_EVENT_ID"  :data.rows[i].EV_EVENT_ID
    		            	}
    		            ,success : function (paramData){
    		            	if(paramData.eventStatus ==1){
    		            	}else{
    		            		$('#dvAlertOk').text("이벤트 보러가기");
    		            		fnConfirm(
		    						"스탬프 획득! 모든 이벤트 페이지를 방문하고 스탬프를 모아, 할인쿠폰을 받아보세요."
		    						,function(e){
		    							location.href = "/event/goodsEventStamp?ID="+eventId;
		    						},function(e){
		    						}
		    						,"이벤트 보러가기"
		    					);}
    		            	}
    		        });
    		   }
    	   }
       }
   });
	
};

function getHeaderKwdEvent(){
	$('.dvSrhWord').off().on('click',function(){
		var keyword = $(this).attr('class');
		keyword = keyword.replace('dvSrhWord ','');		
		
		$('#dvSrhBar').val(keyword);
		
		getHeaderSearch();
	});
	
	$('.dvDelCTop').off().on('click',function(){
    	var index = $(this).attr('id').replace('dvDelCTop_','');
    	var keyword = $(this).data('value');
    	
    	$(this).closest('li').remove();
    	$('#dvDelCMid_'+index).closest('span').remove();
    	
    	delCookieData("latelykwd" ,keyword , 30);
    });
};

function getHeaderSearch(){

	var url = '/shop/search';
	var ITEM_SRH_OPT_VAL = $('#dvSrhBar').val();		
	
	if(ITEM_SRH_OPT_VAL == undefined || ITEM_SRH_OPT_VAL == null || ITEM_SRH_OPT_VAL.trim() == ''){
		fnAlert('검색어를 입력해 주세요');
	}else if( !(ITEM_SRH_OPT_VAL.length > 1) ){
        fnAlert('검색어는 두 글자 이상 입력하셔야 합니다.');
    }else{
		setCookie('latelykwd',$('#dvSrhBar').val(),30); // 쿠키명,쿠키값,유지기간(날짜)
					
		ITEM_SRH_OPT_VAL = "?ITEM_SRH_OPT_VAL=" + ITEM_SRH_OPT_VAL;
					
		window.location.href = url + ITEM_SRH_OPT_VAL;
	};
};

// 헤드 메뉴 노출 여부
function getHeadMenuYn(){
	fnAjax({
        url : '/biz/event/getHeadMenuYn',
        success : function (data){
        	if(data.preorderTotal > 0){
        		$('#preorderMenu').show();
        	}else{
        		$('#preorderMenu').hide();
        	}
        	if(data.limitedTotal > 0){
        		$('#limitedMenu').show();
        	}else{
        		$('#limitedMenu').hide();
        	}
        }
    });
}

// 키워드 > 노출키워드
function getDpKwdDp(){
	if(fnGetUrlParameter("ctgryId") == null || fnGetUrlParameter("ctgryId") == undefined){
		ctgryId = 0;
	}
	
	fnAjax({
		 url : '/biz/main/getDpKwdDp'
		,params : {'IL_CTGRY_ID' : ctgryId}
		,success : function (data){
			$.each(data.rows, function(){
				fnDataBind('dvDpKwd', this, $('#dvDpKwdArea'));
			});
		}
	});
}

function setCookie(cName ,cValue ,exdays){
	
	var exdate = new Date();
	
	exdate.setDate(exdate.getDate() + exdays);
	
	var tmp = getCookie(cName);
	
	if(tmp != undefined){
		tmp = tmp.split(",");
				
		tmp[tmp.length] = cValue;
		
		if(tmp.length > 10){
			tmp.splice(0,1);
		};
					
		var result = [];
		
		$.each(tmp, function(index,element){						
			if($.inArray(element, result) == -1){				
				result.push(element);
			}else{				
				result.splice($.inArray(element, result),1);
				result.push(element);
			}
		});
		
		tmp = result;
		
		tmp = tmp.join();
	}else{
		tmp = cValue;
	};
		
	var setValue = escape(tmp) + ((exdays==null) ? "" : ";path=/; expires="+exdate.toUTCString());
		
	document.cookie = cName + "=" + setValue;

};

function getCookie(cName){

	var i,x,y,ARRcookies=document.cookie.split(";");

	for (i=0;i<ARRcookies.length;i++){
		
		x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
		y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);

		x=x.replace(/^\s+|\s+$/g,"");

		if(x==cName){
			return unescape(y);
		};
	};
};

function delCookie(cName){
	setCookie(cName, '', -1);	
};

function delCookieData(cName, keyword ,exdays){

	var exdate = new Date();
	exdate.setDate(exdate.getDate() + exdays);
	
	var cookie = getCookie(cName);
	
	cookie = cookie.split(",");
	cookie.splice(cookie.indexOf(keyword.toString()),1);

	if(cookie.length > 0){
		var setValue = escape(cookie) + ((exdays==null) ? "" : ";path=/; expires="+exdate.toUTCString());
	
		document.cookie = cName + "=" + setValue;	
	}else{
		delCookie(cName);
		wordHeaderClear();
		fnDataBind( 'dvLatelyNothing', {}, $('#key-tab2'));
	};
};

function fnLogout(){
	fnAjax({
        url     : "/biz/member/logOut"
        ,success : function (data){
        	location.reload();
        }
    });
};

function wordHeaderClear(){
	$('#dvTrendWordArea').empty();
	$('#dvLatelyWordArea').empty();
	$('#dvLatelyCountZero').remove();
};

function getHeaderTrend(){
	wordHeaderClear();
	
	var rank = 1;

	fnAjax({
         url : '/biz/shop/getTrendKeywords'
        ,success : function (data){
        	$.each(data.rows,function(){
        		fnDataBind( 'dvTrendWord', this, $('#dvTrendWordArea'));
        		rank++;
        	});
        	getHeaderKwdEvent();
        }
    });
};

function getHeaderLately(){
	wordHeaderClear();
	
	var list = [];
	var map = {};
			
	var data = getCookie("latelykwd");
	
	if(data != undefined){
		
		data = data.split(",");
		
		for(var i =0; i < data.length ; i++){
			map['KEYWORD'] = data[data.length - i - 1];
			map['INDEX'] = data.length - i - 1;
			
			fnDataBind( 'dvLatelyWord', map, $('#dvLatelyWordArea'));			
		}
		getHeaderKwdEvent();
	}else{		
		fnDataBind( 'dvLatelyNothing', {}, $('#key-tab2'));
	};
};
		

function getHeaderSmartMaker(params){
	fnAjax({
         url : '/biz/shop/getSmartMaker'            
        ,params  : params
        ,success : function (data){
        	$.each(data.rows,function(){            	
	        	if(this.KEYWORD == undefined || this.KEYWORD == null || this.KEYWORD == ''){
	        	}else{
	        		var split = this.KEYWORD.indexOf(params.searchTerm);
	        		var length = params.searchTerm.length;
	        		
	        		this['KEYWORD1'] = this.KEYWORD.substring(0,split);
	        		this['KEYWORD2'] = this.KEYWORD.substring(split,split+length);
	        		this['KEYWORD3'] = this.KEYWORD.substring(split+length,this.KEYWORD.length);
	        		
	        		fnDataBind( 'dvSmartWord', this, $('#dvSmartWordArea'));						        		
		        };
	        });	        
	        getHeaderKwdEvent();
        }
    });
};
function fnCallEventStamp(a,b,c){
	fnConfirm("오늘의 출석체크 완료! "+b+"일 동안 출석하면 쿠폰을 드려요. ( "+a+"/"+b+")", function(e){
		location.href ="/event/goodsEventStamp?ID="+c;
	} ,null, "이벤트 보러가기");
}
function fnSetAppTypeCallByApp(param){
	fnAjax({
        url     : "/mobileApp/putSetAppType"
         ,params : {"APP_TYPE" :param }
        ,success : function (data){
        }
    });
}
function getPwCheck(){
	if($('#headerPwChange').val()){
		if($('#headerPwChange').val() =="Y" && IS_SESSION=="Y"){
			$('#headerPwChange').val("N");
			$.facebox({ajax:'/popup/pwResetting'});			
		}	
	}
}
function getCaluseView(param){
	$.facebox({ajax:'/popup/termInput?PS_CLAUSE_GRP_ID='+param});
}
function showGetCaluse(target){
	fnAjax({
   		 url : "/biz/join/getCaluse"
   		,success : function (data){
   			for(var i=0; i < target.length; i++){
   				for(var j=0; j < data.rows.length; j++){
   					if(target[i].ID == data.rows[j].PS_CLAUSE_GRP_ID){
   						$('#'+target[i].TARGET).html(data.rows[j].CONTENTS);
   					}	
   				}
   			}
   			//$('#'+target).html(data.rows);
   		}
 	});
	
}



function getDpPopup(IL_CTGRY_ID){
	fnAjax({
   	 url : "/dpComn/getDpPopup"
   	,params : {"IL_CTGRY_ID" :IL_CTGRY_ID}
   	,success : function (data){
   		if(data.rows.length > 0){
	   		$.each(data.rows,function(){
	   			if(getCookiePop("Today_"+this.DP_POPUP_ID)!="Y"){
		    		if(this.TODAY_YN == "Y"){
		    			this.TODAYYN = "Y";
		    		}
		    		fnDataBind( 'dvdpPopupTemplate', this, $('#dvdpPopupArea'));

		    		$('#dpPopup_'+this.DP_POPUP_ID).css('left', this.POSITION_LEFT);
		    		$('#dpPopup_'+this.DP_POPUP_ID).css('top', this.POSITION_TOP);
	   			} 
	    	});
   		}
   	}
   });
}

//쿠키 생성
function setCookiePop(name, value, expiredays) {
	var today = new Date();
    today.setDate(today.getDate() + expiredays);
    document.cookie = name + '=' + escape(value) + '; path=/; expires=' + today.toDateString() + ';';
}

//쿠키 가져옴
function getCookiePop(name){ 
	var cName = name + "="; 
	var x = 0; 
	   
	while(x <= document.cookie.length) 
	{
		var y = (x+cName.length); 
		
		if(document.cookie.substring(x, y) == cName) 
		{ 
			var endOfCookie = document.cookie.indexOf(";", y);
			
			if(endOfCookie == -1){
				endOfCookie = document.cookie.length;
			}
			return unescape(document.cookie.substring(y, endOfCookie)); 
		} 
		x = document.cookie.indexOf(" ", x ) + 1; 
		
		if (x == 0) 
		break; 
	} 
	return ""; 
}


function closeDpPopup(item, DP_POPUP_ID){	             
	if($('#popchk_'+DP_POPUP_ID).prop("checked")){
		setCookiePop('Today_'+DP_POPUP_ID,'Y', 1);
	}
	$("#dpPopup_"+DP_POPUP_ID).hide();
}

Handlebars.registerHelper({
    'HELPER_PRICE_FORMAT' : function( price ) {    	
        return fnDataFormat( price, 'toPrice' );
    }
    ,'HELPER_IF_SALE_YN' : function(options) {
        if( this.MARKET_PRICE > this.PAID_PRICE ){
            return options.fn(this); 
        }else{
            return options.inverse(this);
        };
    }
	,'HELPER_HTML' : function( html ) {
        return new Handlebars.SafeString( fnHtmlSpecialCharsDecode( "<div>" + html +"</div>" ) );
    }
});
function fnCommLogin(){
	var reUrl =  encodeURIComponent(location.href) ;
	location.href = "/member/login?reurl="+reUrl;
}