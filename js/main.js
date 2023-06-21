$(function() {
    //window height + window scrollY 값이 document height보다 클 경우,
    $(window).on("scroll", function() {
        if((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            // 물건 스크롤 로드
            productListMain();
        }
    });
});



var textBullet = ['오픈기념 할인💸', '이용가이드📘', 'TOP100👑', '이달의 작가💎', '러블리MOOD👒', '여름MOOD🎐', '구매자리뷰💰', '몽환MOOD🔮', '농구놀이🏀', '우주MOOD✨', '빠른마감🚨'];
            
// 비주얼 슬라이드
var visualSwiper = new Swiper(".visual_slide", {
    centeredSlides: true,
    autoplay: {
        delay: 4000,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".text_bullet",
        clickable: true,
        renderBullet: function (index, className) {
            return '<div class="' + className + '"><span>' + (textBullet[index]) + '</span></div>';
        }
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    on: {
        slideChange : function() {
            var target = $(".swiper-pagination-bullet-active");
            muCenter(target);
        },
    },
});

// 추가 페이지네비게이션
var pagingSwiper = new Swiper(".visual_slide", {
    pagination: {
        el: ".swiper-pagination",
        type: "fraction",
    },
});

visualSwiper.controller.control = pagingSwiper;

// 페이지네비게이션 가운데 정렬
var $scrItem = $('.swiper-pagination-bullet');
var scrIWidth = 0;
for (var i=0; i<$scrItem.length; i++) {
    scrIWidth += $scrItem.eq(i).outerWidth();
}
$('.text_bullet').css('width',scrIWidth)
function muCenter(target){
    var box = $('.text_bullet_area');
    var boxItem = box.find('.swiper-pagination-bullet');
    var boxHarf = box.width()/2;
    var pos;
    var listWidth=0;
    var targetLeft = 0;

    boxItem.each(function(){ listWidth += $(this).outerWidth(); })    
                
    for (var i=0; i<target.index(); i++) targetLeft += boxItem.eq(i).outerWidth(); // 선택요소 까지 길이
                
    var selectTargetPos = (targetLeft + target.outerWidth()/2);
    if (selectTargetPos <= boxHarf) { // left
        pos = 0;
        $(".pagination_gradient.right").show();
    } else if (listWidth - selectTargetPos <= boxHarf) { //right : target 절반 이후 영역이 boxHarf 보다 작을경우 right 정렬
        pos = listWidth-box.width();
        $(".pagination_gradient.right").hide();
    } else {
        pos = selectTargetPos - boxHarf; // 중앙정렬
        $(".pagination_gradient.right").show();
    }
                
    setTimeout(function(){
        box.animate({scrollLeft:pos},300)
    }, 200);
}

// 자동 슬라이드 시작
function autoPlay() {
    visualSwiper.autoplay.start();
    $("#slidePlay").hide();
    $("#slideStop").show();
    return false;
}
            
// 자동 슬라이드 멈춤
function autoPause() {
    visualSwiper.autoplay.stop();
    $("#slideStop").hide();
    $("#slidePlay").show();
    return false;
}

// 제품 무한 스크롤
function productListMain() {
    // 표지 인덱스 번호 부여
    var productIndex = $("#mainProductList_1").find("li").length;

    for (var i = 1; i < 2; i++) {
        var productLike = i + productIndex;

        for (var j = 1; j <= 20; j++) {
            var productImg = (j - 1) % 20 + 1; // 이미지 1부터 20까지 반복

            var addProduct = '<li>'
                + '<a href="javascript:void(0)">'
                + '<div class="img_box">'
                + '<img src="../image/cover/cover_' + productImg + '.jpg" alt="표지' + productLike + '_'+ productImg +'" />'
                + '<label for="product_like_main_' + productLike + '_'+ productImg +'" class="product_like">'
                + '<input type="checkbox" name="관심" id="product_like_main_' + productLike + '_'+ productImg +'" />'
                + '</label>'
                + '</div>'
                + '<div class="text_box">'
                + '<span class="user_name">작가이름</span>'
                + '<p class="product_name">표지타이틀</p>'
                + '<div class="product_info_num">'
                + '<p class="price"><strong>50,000</strong>원</p>'
                + '<span class="product_like_num"><span class="blind">관심수</span>10</span>'
                + '</div>'
                + '</div>'
                + '</a>'
                + '</li>';


            // 추가되는 콘텐츠 append
            $("#mainProductList_1").append(addProduct);

        }

    }

}





