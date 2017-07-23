var itemTemplateAjaxChk = true;

$(document).on({
	click : function (){
		$('#check-all').off().on('click',function() {
			var target = $('#check-all').closest('[class|="custom-checkbox"]').next().find('input[type="checkbox"]');

			($('#check-all').prop('checked') === true) ? target.prop('checked',true) : target.prop('checked',false);

			target.on('click',function() {
				if ($('#check-all').prop('checked') === true) {
					$('#check-all').prop('checked',false);
				};
			});
		});
	}
},".dvItemChkBox");

$(document).on({
	click : function (){
		var $this = $(this);

		var url = "/biz/mypage/wishlist/addProductList";
		var msg = "관심 상품으로 등록되었습니다. <br>관심 상품 목록으로 이동하시겠습니까?";
		var flag = true;
		var id = $this.attr('dvItemId');
	
		var productParams = { IL_ITEM_ID : id , OPTION : 'wishList' };

		if($this.hasClass('active')){
			url = "/biz/mypage/wishlist/delProductList";
			msg = "관심 상품 목록에서 해제되었습니다.";
			flag = false;
		};
		
		fnLoginCheck(function(e){
			if(!itemTemplateAjaxChk){
				return;
			}else{
				itemTemplateAjaxChk= false;
				
				fnAjax({
			         url : url
			        ,params : productParams
			        ,success : function (data){
			        	itemTemplateAjaxChk = true;
			        	
			        	data['IL_ITEM_ID'] = id;
			        	
			        	if(flag){
			        		data['PRODUCT_FLAG'] = 'T';	
			        	}else{
			        		data['PRODUCT_FLAG'] = 'F';
			        	};
			        	
			        	if(flag){
			        		fnConfirm(msg, function(){location.href='/mypage/wishlist/productList';});	
			        	}else{
			        		if(location.pathname == '/mypage/wishlist/productList'){
								fnAlert(msg, function(){history.go(0);});
							}else{
								fnAlert(msg);								
							};
			        	};
			        	
			        	chkProductList(data);
			        }
				});
			};			
		});
	}
},".dvWish");

function chkProductList(data){
	var chkProductList = data.PRODUCT_FLAG;
	var id = data.IL_ITEM_ID;	
	
	$('.dvWish[dvItemId='+id+']').each(function(){
		if(chkProductList == 'T'){
			$(this).toggleClass('active',true);
		}else{
			$(this).toggleClass('active',false);
		};
	});	
};

Handlebars.registerHelper({
    'HELPER_PRICE_FORMAT' : function( price ) {    	
        return fnDataFormat( price, 'toPrice' );
    }
    ,'HELPER_IF_SOLDOUT' : function(options) {
        if( !(this.STOCK > 0) ){        	
            return options.fn(this);
        }else{
        	return options.inverse(this);
        };
    }
    ,'HELPER_IF_DISP_QTY_FLAG' : function(options) {
    	//console.log(location.pathname);
        if( this.DISP_QTY_FLAG == 'Y' && (location.pathname == '/event/preorderList' || location.pathname == '/event/limitedList')) {	//사전주문, 한정패키지일 경우에만 구매수 표시 여부 노출
			return options.fn(this);
        }else{
        	return options.inverse(this);
        };
    }
    ,'HELPER_IF_SALE_YN' : function(options) {
        if( this.MARKET_PRICE > this.PAID_PRICE ){
            return options.fn(this); 
        }else{
            return options.inverse(this);
        };
    }
    ,'HELPER_USE_CHECK_BOX' : function(options) {    	
        if( this.USE_CHECK_BOX == 'Y' ){
            return options.fn(this); 
        }else{
            return options.inverse(this);
        };
    }
    ,'HELPER_IF_ADD_DEPOSIT_MILEAGE' : function(options) {       
        if( this.ADD_DEPOSIT_MILEAGE == 'Y' ){
            return options.fn(this); 
        }else{
            return options.inverse(this);
        };
    }
    ,'HELPER_IF_SHIPPING_PICKUP_ICON' : function(options) {       
        if( this.SHIPPING_PICKUP == 'Y' ){
            return options.fn(this); 
        }else{
            return options.inverse(this);
        };
    }
    ,'HELPER_IF_DOWN_COUPON' : function(options) {       
        if( this.DOWN_COUPON == 'Y' ){
            return options.fn(this); 
        }else{
            return options.inverse(this);
        };
    }
    ,'HELPER_IF_COUPON_ICON' : function(options) {       
    	if( this.DOWN_COUPON == 'N' && this.COUPON_ICON == 'Y' ){
    		return options.fn(this); 
    	}else{
    		return options.inverse(this);
    	};
    }
    ,'HELPER_IF_FREE_SHIPPING_PRICE_YN' : function(options) {       
        if( this.FREE_SHIPPING_PRICE_YN == 'Y' ){
            return options.fn(this); 
        }else{
            return options.inverse(this);
        };
    }
    ,'HELPER_IF_FREE_SHIPPING_PRICE_YN' : function(options) {       
        if( this.FREE_SHIPPING_PRICE_YN == 'Y' ){
            return options.fn(this); 
        }else{
            return options.inverse(this);
        };
    }
    ,'HELPER_IF_PRODUCT_FLAG' : function(options) {
        if( this.PRODUCT_FLAG == 'T' ){
            return options.fn(this); 
        }else{
            return options.inverse(this);
        };
    }
    ,'HELPER_IF_IS_SESSION' : function(options) {
        if( IS_SESSION == 'Y' ){
            return options.fn(this);
        }else{
            return options.inverse(this);
        };
    }    
});

// 서브 상품 상품 목록
function getBestItemList(length, subListType){
	if(typeof itemId != "undefined"){
		var subParams = {'length': length, 'subListType': subListType, 'IL_ITEM_ID' : itemId};
	}else{
		var subParams = {'length': length, 'subListType': subListType};
	}
	fnAjax({
        url : '/biz/mypage/wishlist/getBestItemList'
        ,params : subParams
        ,success : function (data){
        	console.log('JA' , data);
			// 구매 고객들이 함께 구매한 상품
    		$('#dvTogetherList').html('');
			if(subListType.indexOf('Together') > -1){
				fnDataBind( 'dvTogetherItemTemplate', data, $('#dvTogetherList'));
				$.each(data.togetherRows, function(i){
					if(i <= 3){
					fnDataBind( 'dvComnItemTemplate', this , $('#dvTogetherListArea'));
					}
		        });
			}
			
    		// 베스트 상품
    		$('#dvBestList').html('');
			if(subListType.indexOf('Best') > -1){
				fnDataBind( 'dvBestItemTemplate', data, $('#dvBestList'));
				$.each(data.bestRows, function(i){
					if(i <= 3){
						fnDataBind( 'dvComnItemTemplate', this , $('#dvBestListArea'));
					}
		        });
			}
			
			// 유저 맞춤 추천 상품  
			$('#dvRecommandList').html('');
			if(subListType.indexOf('Recom') > -1){
				fnDataBind( 'dvRecommandItemTemplate', data, $('#dvRecommandList'));
				$.each(data.recomRows, function(i){
					if(i <= 3){
						fnDataBind( 'dvComnItemTemplate', this , $('#dvRecommandListArea'));
					}
		        });
	        }
			
			// CSS 제어 부분
			var subTargetUrl = document.location.href;
        	if(!(subTargetUrl.indexOf('goodsView') > -1)){
        		$('.dvInnerAlign').removeClass('inner-align-module');
        	}
			//runAfterDataBind();
        }
    });
}; 

