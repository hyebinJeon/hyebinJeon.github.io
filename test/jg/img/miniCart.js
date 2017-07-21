Handlebars.registerHelper({
    'HELPER_IF_YN' : function( value ,options) {
        if( value == 'Y' ){
            return options.fn(this); 
        }else{
            return options.inverse(this);
        }
    }
    ,'HELPER_PRICE_SIGN' : function( price ) {
        return (price > 0 ? '+' : '');
    }
});

$(function(){
    //템플릿 세팅
    fnSetTemplate('dvMiniCartItemOptionSelectTemplate', $("#dvMiniCartItemOptionSelectTemplate")) ;
    fnSetTemplate('dvMiniCartItemOptionSelectOptionTemplate', $("#dvMiniCartItemOptionSelectOptionTemplate")) ;
    fnSetTemplate('dvMiniCartShippingTypeSelectTemplate', $("#dvMiniCartShippingTypeSelectTemplate")) ;
    fnSetTemplate('dvMiniCartOrderItemTemplate', $("#dvMiniCartOrderItemTemplate")) ;
    fnSetTemplate('dvMiniCartPickupScheduleDateTemplate', $("#dvMiniCartPickupScheduleDateTemplate")) ;
    fnSetTemplate('dvMiniCartWishTemplate', $("#dvMiniCartWishTemplate")) ;
    
    //방문 예정일 옵션 처리
    var now = fnGetToday('yyyyMMdd');
    var pickupScheduleDate = new Array();
    for (var i=0; i < 7; i++) {
        var str = fnGetDayAdd(now,i,'yyyy-MM-dd|e');
        var ar = str.split('|');
        pickupScheduleDate.push({ DATE : ar[0], WEEK_TEXT : ar[1] });
    };
    fnDataBind('dvMiniCartPickupScheduleDateTemplate',{ PICKUP_SCHEDULE_DATE : pickupScheduleDate }, $('#dvMiniCartPickupScheduleDate'));
    //미니카트 html 저장 (템플릿이 아니라서 html로 저장)
    fnSetTemplate('dvMiniCart', $("#dvMiniCart").html() ) ;
});

//미니카트 열기
$(document).on({
    click :function ( e ){
        var dvItemId = $(this).attr('dvItemId');
        var dvShippingType = $(this).attr('dvShippingType');
        if( $('#dvMiniCart').attr('dvItemId') != dvItemId ){
            fnAjax({
                url : '/biz/shop/getGoodsView',
                params : {IL_ITEM_ID : dvItemId, MINI_CART : "Y"},
                success : function (data){
                    //미니카트
                    initMiniCart();
                    setMiniCart( { ITEM : data.rows, OPTION : data.option } );
                    showMiniCart( dvShippingType );
                }
            });
        }else{
            showMiniCart( dvShippingType );
        }
    }
},".dvMiniCartOpen");

//멀티 미니카트 열기
$(document).on({
    click :function ( e ){
        var dvShippingType = $(this).attr('dvShippingType');
        if( $('.dvItemChkBox:checked').length > 0 ){
            initMiniCart();
            $('.dvItemChkBox:checked').each(function (i){
                setMultMiniCart( { ITEM : getMultiMiniCartItem(this.value) } );
            });
            showMiniCart( dvShippingType );
        }else{
            fnAlert("상품을 선택해주세요.");
        }
    }
},".dvMultiMiniCartOpen");

//미니카트 닫기
$(document).on({
    click :function ( e ){
    	if($('#dvMiniCart').hasClass('goods-v')){}
    	else {hideMiniCart();}
    }
},".dvMiniCartCancel");

//옵션 선택
$(document).on({
    change :function ( e ){
        miniCartEvent( 'selectOption', $(this) );
    }
},".dvMiniCartItemOption");

//미니카트 상품 삭제
$(document).on({
    click :function ( e ){
        miniCartEvent( 'delMiniCartOrderItem', $(this) );
    }
},".dvDelMiniCartOrderItem");

//미니카트 상품 수량 변경(down)
$(document).on({
    click :function ( e ){
        miniCartEvent( 'changeMiniCartOrderItemQtyDown', $(this) );
    }
},".dvMiniCartOrderItemQtyDown");

//미니카트 상품 수량 변경(up)
$(document).on({
    click :function ( e ){
        miniCartEvent( 'changeMiniCartOrderItemQtyUp', $(this) );
    }
},".dvMiniCartOrderItemQtyUp");

//미니카트 상품 직접수정
$(document).on({
    keyup :function ( e ){
        miniCartEvent( 'changeMinicartTotal');
    }
},".dvMiniCartOrderItemQty");

//미니카트 구매하기
$(document).on({
    click :function ( e ){
        miniCartEvent( 'cart');
    }
},"#dvMiniCartButtonCart");

//미니카트 장바구니
$(document).on({
    click :function ( e ){
        miniCartEvent( 'order');
    }
},"#dvMiniCartButtonOrder");

//미니카트 배송 타입 변경
$(document).on({
    change :function ( e ){
        miniCartEvent( 'changeMiniCartShippingType', $(this));
    }
},"#dvMiniCartShippingType");

//미니카트 장바구니 옵션 추가
$(document).on({
    click :function ( e ){
        miniCartEvent( 'cartReload');
    }
},"#dvMiniCartButtonCartReload");

//방문타입 변경시 방문예정일 노출 여부
$(document).on({
    change :function ( e ){
        if($(this).val()=='1')              $('#dvMiniCartPickupScheduleDateArea').hide();  //당일방문
        else                                $('#dvMiniCartPickupScheduleDateArea').show();  //지정일방문
    }
},"#dvMiniCartPickupDateType");


//미니카트 이벤트
function miniCartEvent( act, $thisObj ){
    switch( act ){
        //옵션 선택
        case 'selectOption' :
            //옵션 선택 안했을때
            if( $thisObj.val() == '-1' ){ 
                //선택 이후 옵션 초기화
                _resetOption( $thisObj );
            }else if( $thisObj.val() == '' ){ 
                //선택 이후 옵션 초기화
                _resetOption( $thisObj );
                //다음 댑스 옵션 선택
                _nextOptionDataBind( $thisObj );
            }else{
                //미니 카트 담기 처리
                _addMinicart( $thisObj , 'O', 1);
                _resetOption( $thisObj , true );
                _modifyMiniCartOrderItemIndex();
                
                //UI 관련 처리 (※화면에 따라서 필요 없을수 있음)
                $('#dvMiniCartOrderWrap').show();
                $('#dvMiniCartNoOptionsSelect').hide();
            }
        break;
        //선택 옵션 삭제
        case 'delMiniCartOrderItem':
            _delMiniCartOrderItem( $thisObj );
            _modifyMiniCartOrderItemIndex();
            
            //UI 관련 처리 (※화면에 따라서 필요 없을수 있음)
            if( $('.dvMiniCartOrderItem').length == 0 ){
                $('#dvMiniCartOrderWrap').hide();
                $('#dvMiniCartNoOptionsSelect').show();
            }
        break;
        //수량 다운
        case 'changeMiniCartOrderItemQtyDown':
            _changeMiniCartOrderItemQty( $thisObj , 'down' );
        break;
        //수량 증가
        case 'changeMiniCartOrderItemQtyUp':
            _changeMiniCartOrderItemQty( $thisObj , 'up' );
        break;
        //미니카트 총 금액 변경
        case 'changeMinicartTotal':
            _changeMinicartTotal();
        break;
        //미니카트 배송타입 변경
        case 'changeMiniCartShippingType':
            _changeMiniCartShippingType( $thisObj );
        break;
        //장바구니 담기
        case 'cart':
        case 'order':
        case 'cartReload':
            if( $('#dvMiniCart').hasClass('active') ){
                _orderMiniCart( act );
            }else{
                showMiniCart();
            }
        break;
    }
}

function initMiniCart(){
    $('#dvMiniCart').empty();
    $('#dvMiniCart').append( fnGetTemplate('dvMiniCart') );
    
    fnSetTemplate('dvMiniCartItemOptionSelectTemplate', $("#dvMiniCartItemOptionSelectTemplate")) ;
    fnSetTemplate('dvMiniCartItemOptionSelectOptionTemplate', $("#dvMiniCartItemOptionSelectOptionTemplate")) ;
    fnSetTemplate('dvMiniCartShippingTypeSelectTemplate', $("#dvMiniCartShippingTypeSelectTemplate")) ;
    fnSetTemplate('dvMiniCartOrderItemTemplate', $("#dvMiniCartOrderItemTemplate")) ;
}

function setMiniCart( bindData ){
    
    $('#dvMiniCart').attr('dvItemId',bindData.ITEM.IL_ITEM_ID);
    
    setStorageData('miniCartMode', "SINGLE");
    setStorageData('miniCartItemData', bindData.ITEM);
    setStorageData('miniCartOptionData', bindData.OPTION);
    
    $('#dvMiniCartShippingTypeSelect').empty();
    fnDataBind( 'dvMiniCartShippingTypeSelectTemplate', bindData.ITEM ,$("#dvMiniCartShippingTypeSelect"));
    
    //관심상품 관련 처리
    fnDataBind( 'dvMiniCartWishTemplate', {IL_ITEM_ID : bindData.ITEM.IL_ITEM_ID, PRODUCT_FLAG : bindData.ITEM.PRODUCT_FLAG});
    
    var bindOptionData = _getInitBindOptionData( bindData.OPTION );
    if( bindOptionData.length > 0 ){
        
        fnDataBind( 'dvMiniCartItemOptionSelectTemplate', {OPTIONS : bindOptionData} );
        
        $.each(bindOptionData, function (i,option){
            $.each(option.OPTN_DETL, function (j,optoinDetail){
                fnDataBind( 'dvMiniCartItemOptionSelectOptionTemplate', optoinDetail, $('.dvMiniCartItemOption[dvOptnId='+ option.IL_ITEM_OPTN_ID +'][dvLevel='+ option.LEVEL +']'));
            });
        });
    }else{
        _addMinicart('','I',1);
        //UI 관련 처리 (※화면에 따라서 필요 없을수 있음)
        $('#dvMiniCartOrderWrap').show();
        $('#dvMiniCartNoOptionsSelect').hide();
        $('#dvMiniCart .dvDelMiniCartOrderItem').remove();
    }
    
    //초기화 후 ..
    $('#dvMiniCart select').each(function (){
        $.selectbox._detachSelectbox(this);
    });
    $('#dvMiniCart select').selectbox({
        effect: "slide"
    });
    jQuery('#dvMiniCart .scrollbar-inner').scrollbar();
}

function setMultMiniCart( bindData ){
    setStorageData('miniCartMode', "MULTI");
    setStorageData('miniCartItemData', bindData.ITEM);

    $('#dvMiniCartShippingTypeSelect').empty();
    fnDataBind('dvMiniCartShippingTypeSelectTemplate', {SHIPPING_PICKUP : "Y"} ,$("#dvMiniCartShippingTypeSelect"));
    
    _addMinicart('','I',1);
    //UI 관련 처리 (※화면에 따라서 필요 없을수 있음)
    $('#dvMiniCartOrderWrap').show();
    $('#dvMiniCartNoOptionsSelect').hide();
    $('#dvMiniCart .dvDelMiniCartOrderItem').remove();
    
    //초기화 후 ..
    $('#dvMiniCart select').each(function (){
        $.selectbox._detachSelectbox(this);
    });
    $('#dvMiniCart select:not(#CART_SIDO,#CART_GUGUN)').selectbox({
        effect: "slide"
    });
}

//멀티 미니카트 상품 정보 담기
function setMultiMiniCartItems( itemData ){
    var multiMiniCartItems = getStorageData("multiMiniCartItems");
    if( !multiMiniCartItems ){
        multiMiniCartItems = {};
    }
    multiMiniCartItems[ itemData.IL_ITEM_ID ] = itemData;
    setStorageData("multiMiniCartItems", multiMiniCartItems);
}

//멀티 미니카트 상품 정보 담기
function getMultiMiniCartItem( itemId ){
    var multiMiniCartItems = getStorageData("multiMiniCartItems");
    if( !multiMiniCartItems ){
        multiMiniCartItems = {};
    }
    return multiMiniCartItems[ itemId ];
}

function showMiniCart( dvShippingType ){
    //goods-view page에서만  goods-v class 있음
    if( $('#dvMiniCart').hasClass('goods-v') ){
        $('#dvMiniCartOpenBtn').trigger('click');
    }else{
        $('#dvMiniCart').show().addClass('active');
    }
    
    var miniCartButtonType = true;
    
    if( typeof dvShippingType == 'undefined' || dvShippingType == '' ){
        var path = document.location.pathname;
        //상품 상세에서 이전 페이지가 매장 픽업, 정기배송 일꼉우 미리 선택되어 있어야 함.
        if(path=='/shop/goodsView'){
            var referrerUrl = document.referrer;
            
            //매장 픽엄
            if( referrerUrl.indexOf('/event/pickupList') >= 0 
               || referrerUrl.indexOf('/event/pickupView') >= 0 ){
               dvShippingType = 2;
               miniCartButtonType = false;
            }
            //정기배송
            if( referrerUrl.indexOf('/event/deliveryList') >= 0 ){
               dvShippingType = 3;
               miniCartButtonType = false;
            }
        }
        //매장픽업 매뉴일때
        else if(path=='/event/pickupView' 
                || path=='/event/pickupList'){
            dvShippingType = 2;
            miniCartButtonType = false;
        }
        //정기배송 매뉴일때
        else if(path=='/event/deliveryList'){
            dvShippingType = 3;
            miniCartButtonType = false;
        }
    }
    
    if( 1 <= dvShippingType && dvShippingType <= 4){
        $('#dvMiniCartShippingType').val( dvShippingType );
        $.selectbox._changeSelectbox(  $('#dvMiniCartShippingType').get(0), dvShippingType.toString(), $('#dvMiniCartShippingType option:selected').text() );
        $('#dvMiniCartShippingType').trigger("change");
        if( getStorageData('miniCartMode') == "SINGLE"
            && miniCartButtonType ){
            $('#dvMiniCartButtonTypeBasic').hide();
            $('#dvMiniCartButtonTypeAdd').show();
        }
    }
    
    if( fnGetUrlParameter("CS_SHOP_MNG_ID") ){
        $("#CART_SIDO").hide();
        $("#CART_GUGUN").hide();
        $("#PICKUP_COMPANY_ID").find("option").remove();
        $("#PICKUP_COMPANY_ID").append("<option value='"+fnGetUrlParameter("CS_SHOP_MNG_ID")+"'>"+fnGetUrlParameter("SHOPNAME")+"</option>");
         $.selectbox._detachSelectbox($('#PICKUP_COMPANY_ID').get(0));
         $('#PICKUP_COMPANY_ID').selectbox({
            effect: "slide"
        });
    }else{
    	
        //시도, 구군 데이터 binding
    	fnAjax({
    		url : '/comn/cs/getZipcodeList',
    		params : {P_YN : "Y"},
    		success : function(data) {
    			$.selectbox._detachSelectbox($('#CART_SIDO').get()[0]);
    			$('#CART_SIDO').find('option').remove();
    			$("#CART_SIDO").append("<option value='' > 시/도 선택 </option>");
    			for(var i =0; i < data.rows.data.length; i++){
    				var obj = data.rows.data[i];
    				$("#CART_SIDO").append("<option value='"+obj.LOCAL_CODE+"'>"+obj.ADDR1+"</option>");
    			}
    			$('#CART_SIDO').selectbox({
    				effect: "slide"
    			});
    			//픽업매장 목록
    	        fnCartPickupCompanyList();
    		}
    	});		
    	$('select[name=CART_SIDO]').on('change',function(){
    		fnCartSidoChange();
    	});	
    	$('select[name=CART_GUGUN]').on('change',function(){
    		fnCartPickupCompanyList();
    	});
    	$('select[name=CART_GUGUN]').on('change',function(){
    		if($(this).val() == ''){
    			if($("#CART_SIDO").val() == null || $("#CART_SIDO").val() ==""){
    				$('select[name=CART_SIDO]').focus();
    				fnAlert('시/도를 먼저 선택해 주세요.');
    				return;
    			}
    		}
        });	
    }
}

function fnCartSidoChange(){
	var selectedCd = $('#CART_SIDO').val();
	fnAjax({
		url : '/comn/cs/getZipcodeList',
		params : {LOCAL_CODE : selectedCd},
		success : function(data) {
			$.selectbox._detachSelectbox($('#CART_GUGUN').get()[0]);
			$('#CART_GUGUN').find('option').remove();
			$("#CART_GUGUN").append("<option value='' > 구/군 선택 </option>");
			if(selectedCd != ""){
				for(var i =0; i < data.rows.data.length; i++){
					var obj = data.rows.data[i];
					$("#CART_GUGUN").append("<option value='"+obj.ADDR2+"'>"+obj.ADDR2+"</option>");
				}
			}
			$('#CART_GUGUN').selectbox({
				effect: "slide"
			});
			fnCartPickupCompanyList();
		}
	});
}

function fnCartPickupCompanyList(){
	var sido = $("#CART_SIDO option:selected").text();
	if($("#CART_SIDO option").index($("#CART_SIDO option:selected")) == 0){
		sido = "";
	}
	fnAjax({
		url : '/biz/event/getPickupShopList'
		,params : { "O2O_YN":"Y", 
					"SIDO":sido, 
					"GUGUN":$("#CART_GUGUN").val(), 
					"PROD_CODE":getStorageData('miniCartItemData').USER_DEF_CD,
					"SUBWAY_YN":"N"
					}
		,success : function (data){
		    $.selectbox._detachSelectbox($('#PICKUP_COMPANY_ID').get()[0]);
		    $("#PICKUP_COMPANY_ID").find("option:not(:first)").remove();
			for(var i =0; i < data.rows.length; i++){
				var obj = data.rows[i];
				$("#PICKUP_COMPANY_ID").append("<option value='"+obj.CS_SHOP_MNG_ID+"'>"+obj.SHOP_NAME+"</option>");
			}
			$('#PICKUP_COMPANY_ID').selectbox({
                effect: "slide"
            });
		}
	});
}


function hideMiniCart(){
    $('#dvMiniCart').hide();
    var $doc = $('#document'),
        $body = $('body');
    $body.removeAttr('style');
    $('.dimmed').remove();
}

//선택한 옵션 장바구니 담기 함수
function _orderMiniCart( act ){
    
    var cartData = new Array;
    var $orderItems = $('#dvMiniCartOrderArea .dvMiniCartOrderItem');
    var errorMsg = "";
    
    //비회원 예외처리
    if(IS_SESSION != "Y" && act =='order'){
        if( $('#dvMiniCartShippingType').val() == "2" || $('#dvMiniCartShippingType').val() == "3" ){
            //errorMsg = "비회원은 매장픽업을 이용하실수 없습니다.";
            fnLoginPage();
            return false;
        }
    }
    //옵션 필수 선택 처리
    $('.dvMiniCartItemOption[dvLevel=1][dvMandatory=1]').each(function (i){
       if( !($('.dvMiniCartOrderItem[dvSelectOptnId='+ $(this).attr('dvOptnId') +']').length > 0) ){
           errorMsg = '`'+ $('.dvMiniCartItemOption[dvOptnId='+$(this).attr('dvOptnId')+']').find('option[value=-1]:selected').eq(0).text() +'`을 선택하세요.';
           return false;
       }
    });
    //예외처리
    if( errorMsg == "" && $orderItems.length == 0 ){
        fnAlert('옵션을 1개 이상 선택하셔야 합니다.');
        return;
    }
    //수량 체크
    $orderItems.each(function (i){
        if( $(this).find('.dvMiniCartOrderItemQty').val() < 1 ){
            errorMsg = "수량은 1개 이상 구매 하셔야 합니다.";
            return false;
        }
    });
    //매장 픽업시 매장 필수 선택
    if( $('#dvMiniCartShippingType').val() == "2"
        && $('#PICKUP_COMPANY_ID').val() == "" ){
        errorMsg = "방문매장을 선택해주세요.";
    }
    
    if( errorMsg!= "" ){
        fnAlert( errorMsg );
        return;
    }
    
    if(getStorageData('miniCartMode') == "MULTI"){
        var cartDatas = _multiMiniCartData( $orderItems );
    }else{
        var cartDatas = _basicMiniCartData( $orderItems );
    }
    
    fnAjax({
        url : '/biz/shop/addCart',
        params : { CART_DATAS : JSON.stringify(cartDatas)},
        success : function (data){
            //act : order(바로구매), cart(장바구니 담기)
            if( act =='order' ){
                if(IS_SESSION == "Y"){
                    document.location.href='/shop/infoinput?shippingType='+$('#dvMiniCartShippingType').val()+'&cartDetlIds=' + data.rows.toString();
                }else{
                    location.href = "/member/login?nonOrder="+encodeURIComponent('/shop/infoinput?shippingType='+$('#dvMiniCartShippingType').val()+'&cartDetlIds=' + data.rows.toString())
                    +"&reurl="+encodeURIComponent('/shop/infoinput?shippingType='+$('#dvMiniCartShippingType').val()+'&cartDetlIds=' + data.rows.toString());
                }
            }else if( act=='cart' ){
                fnConfirm('장바구니에 담았습니다.<br/>장바구니로 이동하시겠습니까 ?',_goCartPage, function (){ $('#dvMiniCartOpenBtn').trigger('click'); });
            }else if ( act=='cartReload' ){
                document.location.reload();
            }
        }
    });
}

function _multiMiniCartData( $orderItems ){
    var shippingOptionList = $('#dvMiniCartShippingTypeArea').find('select').serializeArray();
    var cartDatas = [];
    
    $orderItems.each(function (i){
        var cartData = {};
        cartData.IL_ITEM_ID = $(this).attr("dvItemId");
        cartData.IL_SHIPPING_TMPLT_ID = "";
        cartData.SHIPPING_TYPE = $('#dvMiniCartShippingType').val();
        
        var inputList = $(this).find('input').serializeArray();
        var orderItems = new Array();
        var orderItem = {};
        //상품정보
        $.each(inputList,function (j,obj){
            orderItem[ obj.name ] = obj.value;
        });
        //배송 옵션
        $.each(shippingOptionList,function (j,obj){
            orderItem[ obj.name ] = obj.value;
        });
        orderItems.push( orderItem );
        cartData.CART_DETL = JSON.stringify( orderItems );
        cartDatas.push(cartData);
    });
    
    return cartDatas;
}

function _basicMiniCartData( $orderItems ){
    var shippingOptionList = $('#dvMiniCartShippingTypeArea').find('select').serializeArray();
    var cartData = {};
    cartData.IL_ITEM_ID = getStorageData('miniCartItemData').IL_ITEM_ID;
    cartData.IL_SHIPPING_TMPLT_ID = "";
    cartData.SHIPPING_TYPE = $('#dvMiniCartShippingType').val();
    cartData.CART_DETL = "";
    
    var orderItems = new Array();
    $orderItems.each(function (i){
        var inputList = $(this).find('input').serializeArray();
        var orderItem = {};
        //상품정보
        $.each(inputList,function (j,obj){
            orderItem[ obj.name ] = obj.value;
        });
        //배송 옵션
        $.each(shippingOptionList,function (j,obj){
            orderItem[ obj.name ] = obj.value;
        });
        orderItems.push( orderItem );
    });
    
    cartData.CART_DETL = JSON.stringify( orderItems );
    return [cartData];
}

function _goCartPage(){
    document.location.href='/shop/cart';
}

//미니카트 담기
function _addMinicart( $thisObj, type, qty ){
    var selectData = {};
    var itemData = getStorageData('miniCartItemData');
    //옵션 있을때
    if( type == 'O' ){
        var findObj = {
           IL_ITEM_OPTN_ID : $thisObj.attr('dvOptnId')
           ,IL_ITEM_OPTN_DETL_ID : $thisObj.val()
        };
        selectData = _findOptionData( findObj )[0];
        selectData.OPTN_FULL_VAL = selectData.OPTN_VAL1 + '' +( selectData.OPTN_VAL2 ? '-' + selectData.OPTN_VAL2 : '' ) + '' +( selectData.OPTN_VAL3 ? '-' + selectData.OPTN_VAL3 : '' );
        selectData.OPTN_FULL_VAL += '' +( selectData.OPTN_VAL4 ? '-' + selectData.OPTN_VAL4 : '' ) + '' +( selectData.OPTN_VAL5 ? '-' + selectData.OPTN_VAL5 : '' );
        selectData.PAID_PRICE = itemData.PAID_PRICE + selectData.ADD_PRICE;
    }else{
        selectData.PAID_PRICE = itemData.PAID_PRICE;
    }
    
    selectData.IL_ITEM_ID = itemData.IL_ITEM_ID;
    selectData.BRAND_NAME = itemData.BRAND_NAME;
    selectData.ITEM_NAME = itemData.ITEM_NAME;
    selectData.TYPE = type;
    selectData.QTY = qty;
    selectData.SELECT_ITEM_OPTN_ID = ( $thisObj ? $thisObj.attr('dvOptnId') : 0 );
    
    if( type == 'I' ||
        ( type == 'O' 
        && $('#dvMiniCartOrderArea input[name=IL_ITEM_OPTN_DETL_ID][value=' + selectData.IL_ITEM_OPTN_DETL_ID + ']').length == 0 ) ){
        _bindOrderItem( selectData );
        _changeMinicartTotal();
    }
}

//옵션 데이터 바인드
function _bindOrderItem( data ){
    fnDataBind( 'dvMiniCartOrderItemTemplate', data, $('#dvMiniCartOrderArea'));
}

//미니카트 총합계 정보 변경
function _changeMinicartTotal(){
    var totalPrice = 0;
    var totalQty = 0;
    $('.dvMiniCartOrderItem').each(function (){
        var cart_price = parseInt( $(this).find('input[name=CART_PRICE]').val() );
        
        var qty = 0;
        if( parseInt( $(this).find('input[name=QTY]').val() ) > 0 ){
            qty = parseInt( $(this).find('input[name=QTY]').val() );
        }
        totalQty += qty; 
        totalPrice += cart_price * qty; 
    });
    
    $('#dvMiniCartTotalQty').text( fnDataFormat( totalQty, 'toPrice' ) );
    $('#dvMiniCartTotalPrice').text( fnDataFormat( totalPrice, 'toPrice' ) );
}

//미니카트 수량 변경
function _changeMiniCartOrderItemQty( $thisObj , mode ){
    var qtyObj = $thisObj.closest('.dvMiniCartOrderItem').find('.dvMiniCartOrderItemQty');
    var nowQty = parseInt( qtyObj.val() );
    if( isNaN( nowQty ) ){
        nowQty = 0;
    }
    var nextQty = 0;
    if( mode == 'up' ){
        nextQty = nowQty + 1;
    }else{
        nextQty = nowQty - 1;
        if( nextQty  <= 0 ){
            nextQty = 1;
        }
    }
    qtyObj.val( nextQty );
    _changeMinicartTotal();
}

//미니카트 선택 옵션 삭제
function _delMiniCartOrderItem( $thisObj ){
    $thisObj.closest('.dvMiniCartOrderItem').remove();
    _changeMinicartTotal();
}

//vew 에 데이터 바인드할 옵션 정보 구성 함수
function _getInitBindOptionData( optionData ){
    var optionList = new Array();
    $.each( optionData, function (i,option){
        //세트옵션
        if( option.OPTN_TYPE == 'S' ){
            
            var setDetail = option.OPTN_DETL.filter(function (obj) {
                return ( obj.OPTN_DETL_TYPE == 'S');
            });
            
            if( !optionList.some(function (obj){ return _sameSetOptoinCheck(obj,option); }) ){
                var optionPushData = {};
                optionPushData.IL_ITEM_OPTN_ID = option.IL_ITEM_OPTN_ID;
                optionPushData.MANDATORY = option.MANDATORY;
                optionPushData.OPTN_NAME = option.OPTN_TITLE;
                optionPushData.LEVEL = 1;
                optionPushData.OPTN_TYPE = option.OPTN_TYPE;
                optionPushData.OPTN_DETL = _compileOptionDetailData( setDetail , 1 , true );
                optionList.push( optionPushData );
            }else{
                //브라운져 호환 떄문에 findIndex 못씀
                //var setIndex = optionList.findIndex(function(obj){ return _sameSetOptoinCheck(obj, option); });
                var setIndex = -1;
                for (var i = 0; i < optionList.length; ++i) {
                    if (_sameSetOptoinCheck(optionList[i], option)) {
                        setIndex = i;
                        break;
                    }
                }
                var setOptionDetailData = _compileOptionDetailData( setDetail , 1 , true );
                optionList[setIndex].OPTN_DETL.push( setOptionDetailData[0] );
            }
        }
        //일반옵션 
        else{
            for (var j=1; j <= option.OPTN_NAME_CNT; j++) {
                var optionPushData = {};
                optionPushData.IL_ITEM_OPTN_ID = option.IL_ITEM_OPTN_ID;
                optionPushData.MANDATORY = option.MANDATORY;
                optionPushData.OPTN_NAME = option.OPTN_TITLE +' - ' + eval('option.OPTN_NAME' + j);
                optionPushData.LEVEL = j;
                optionPushData.OPTN_TYPE = option.OPTN_TYPE;
                optionPushData.OPTN_DETL = new Array();
                if( j == 1 ){
                    optionPushData.OPTN_DETL = _compileOptionDetailData( option.OPTN_DETL , j , ( option.OPTN_NAME_CNT == j) );
                }
                optionList.push( optionPushData );
            }; 
        }
    });
    return optionList;
}

//같은 세트 함수 여부 체크 함수
function _sameSetOptoinCheck( obj, option ){
    return (obj.OPTN_NAME == option.OPTN_TITLE && obj.OPTN_TYPE == 'S');
}

//옵션 초기화
function _resetOption( $thisObj , all ){
    var optionGruops = $('.dvMiniCartItemOption[dvOptnId='+ $thisObj.attr('dvOptnId') +']');
    optionGruops.each(function (i){
        if( (all && i > 0 ) || (i+1) > $thisObj.attr('dvLevel') ){
            $.selectbox._detachSelectbox(this);
            $(this).find('option:not(:first)').remove();
            $(this).selectbox({
                effect: "slide"
            });
        }
        if( all ){
            $.selectbox._detachSelectbox(this);
            $(this).find('option:first').prop('selected',true);
            $(this).selectbox({
                effect: "slide"
            });
        }
    });
}

//다음 댑스 옵션 선택
function _nextOptionDataBind( $thisObj ){
    var findObj = {
       IL_ITEM_OPTN_ID : $thisObj.attr('dvOptnId')
    };
    var optionGruops = $('.dvMiniCartItemOption[dvOptnId='+ $thisObj.attr('dvOptnId') +']');
    optionGruops.each(function (i){
        if( i < $thisObj.attr('dvLevel') ){
            //findObj['OPTN_VAL'+(i+1)] = $(this).find('option:selected').text();
            findObj['OPTN_VAL'+(i+1)] = $('#sbSelector_' + $.selectbox._getInst($(this).get(0)).uid).text();
        }
    });
    var nextLevel = parseInt( $thisObj.attr('dvLevel') ) + 1;
    var nextData = _compileOptionDetailData( _findOptionData( findObj ), nextLevel, ( nextLevel == optionGruops.length ) );
    
    $.each(nextData, function (i,data){
        
        $.selectbox._detachSelectbox($('.dvMiniCartItemOption[dvOptnId='+ $thisObj.attr('dvOptnId') +'][dvLevel='+ nextLevel +']').get()[0]);
        
        fnDataBind( 'dvMiniCartItemOptionSelectOptionTemplate', data, $('.dvMiniCartItemOption[dvOptnId='+ $thisObj.attr('dvOptnId') +'][dvLevel='+ nextLevel +']'));
        
        $('.dvMiniCartItemOption[dvOptnId='+ $thisObj.attr('dvOptnId') +'][dvLevel='+ nextLevel +']').selectbox({
            effect: "slide"
        });
    });
}

//Option Detail 데이터 가공 함수 
function _compileOptionDetailData( optnDetlData, level, last ){
    var result = new Array();
    
    $.each( optnDetlData, function ( k, optionDetail){
        var compileData = {};
        if( !result.some(function (obj){ return (obj.OPTN_VAL == eval('optionDetail.OPTN_VAL' + level)); }) ){
            if( last ){
                var addPriceText = "";
                if( optionDetail.ADD_PRICE !=0 ){
                     var sign = optionDetail.ADD_PRICE > 0 ? '+' : '' ;
                     addPriceText = " (" + sign + " "+ fnDataFormat(optionDetail.ADD_PRICE,'toPrice') +")";
                }
                compileData.OPTN_VAL = eval('optionDetail.OPTN_VAL' + level) + addPriceText;
                compileData.OPTN_PRICE = getStorageData('miniCartItemData').PAID_PRICE + optionDetail.ADD_PRICE;
                compileData.STOCK = optionDetail.STOCK;
                compileData.IL_ITEM_OPTN_DETL_ID = optionDetail.IL_ITEM_OPTN_DETL_ID;
            }else{
                compileData.STOCK = 999;
                compileData.OPTN_VAL = eval('optionDetail.OPTN_VAL' + level);
            }
            result.push( compileData );
        }
    });

    return result;
}

//Option Detail 검색 함수
function _findOptionData( findObj ){
    
    var optionData = getStorageData('miniCartOptionData');
    
    var option = $.grep(optionData, function( obj ) {
        return ( obj.IL_ITEM_OPTN_ID == findObj.IL_ITEM_OPTN_ID && obj.OPTN_TYPE != 'S' );
    });

    var findArray = new Array();
    $.each(findObj, function (key,val){
        if( key != 'IL_ITEM_OPTN_ID' ){
            findArray.push( "obj."+ key + "== '" + val +"'" );
        }
    });
    
    //세트일때는 IL_ITEM_OPTN_ID 가 달라서 option 정보를 못찾을수 있음! 그래서 예외처리..
    var findOptionDetl = new Array();
    //정상
    if( option.length > 0 ){
        findOptionDetl = option[0].OPTN_DETL;
    //세트일때
    }else{
        option = $.grep(optionData, function( obj ) {
            return ( obj.OPTN_TYPE == 'S' );
        });
        $.each(option, function (i,optionObj){
            $.each(optionObj.OPTN_DETL, function (i,detailObj){
                findOptionDetl.push( detailObj );
            });
        });
    }
    
    if( findArray.length > 0 ){
        var findTxt = "("+ findArray.join("&&") +")";
        var optionDetail = $.grep(findOptionDetl, function( obj ) {
            return eval( findTxt );
        });
        return optionDetail;
    }
}

//배송타입 변경
function _changeMiniCartShippingType( $thisObj ){
    //정기배송
    if( $thisObj.val() == '3' ){
        $('#dvMiniCartShippingTypeOptionPickUpArea').hide();
        $('#dvMiniCartShippingTypeOptionOverseas').hide();
    }
    //매장픽업
    else if( $thisObj.val() == '2' ){
        $('#dvMiniCartShippingTypeOptionPickUpArea').show();
        $('#dvMiniCartShippingTypeOptionOverseas').hide();
    }
    //해외배송
    else if( $thisObj.val() == '4' ){
        $('#dvMiniCartShippingTypeOptionPickUpArea').hide();
        $('#dvMiniCartShippingTypeOptionOverseas').show();
    //일반배송
    }else{
        $('#dvMiniCartShippingTypeOptionPickUpArea').hide();
        $('#dvMiniCartShippingTypeOptionOverseas').hide();
    }
    
    //UI 관련 처리 (※화면에 따라서 필요 없을수 있음)
    if( $thisObj.val() == '2' ){
         $('#dvMiniCart .menu-detail:eq(1)').trigger('click');
    }else{
        $('#dvMiniCart .menu-detail:eq(0)').trigger('click');
    }
}

//미니카트 옵션 선택 index 변경
function _modifyMiniCartOrderItemIndex(){
    $('#dvMiniCart .dvMiniCartOrderItem').each(function (i){
        $(this).find('.dvMiniCartOrderItemIndex').text( i + 1 ); 
    });
}
