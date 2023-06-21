$(function() {

    // 스크롤 이벤트
    $(window).on("scroll", function() {
        var position = $(window).scrollTop();

        // 헤더, 탑버튼
        if (position > 200) {
            $(".header").addClass("thin_hd");
            $(".top_btn").addClass("on");
        } else {
            $(".header").removeClass("thin_hd");
            $(".top_btn").removeClass("on");
        }
        

    });

    

    // 헤더 카테고리
    $(".gnb .depth1 > li").mouseover(function() {
        $(this).find(".depth2").stop().slideDown();
    }).mouseout(function() {
        $(this).find(".depth2").stop().slideUp();
    });

    // 선택박스 커스텀
    const label = document.querySelectorAll('.label');
    label.forEach(function(lb){
        lb.addEventListener('click', e => {
            let optionList = lb.nextElementSibling;
            let optionItems = optionList.querySelectorAll('.option_item');
            clickLabel(lb, optionItems);
        })
    });
    const clickLabel = (lb, optionItems) => {
        if(lb.parentNode.classList.contains('active')) {
            lb.parentNode.classList.remove('active');
            optionItems.forEach((opt) => {
                opt.removeEventListener('click', () => {
                    handleSelect(lb, opt)
                })
            })
        } else {
            lb.parentNode.classList.add('active');
            optionItems.forEach((opt) => {
                opt.addEventListener('click', () => {
                    handleSelect(lb, opt)
                })
            })
        }
    }
    const handleSelect = (label, item) => {
        label.innerHTML = item.textContent;
        label.parentNode.classList.remove('active');
    }

});

// 카테고리 active 클래스 변경
function categoryList(obj) {
    $(obj).parents(".category_list").find("button").removeClass("active");
    $(obj).addClass("active");
}

// 상단 이동
function topMove() {
    $("html, body").animate({scrollTop:0}, '800');
    return false;
}

// 퀵메뉴 팝업
function popToggle(obj) {
    $(obj).parents("li").siblings("li").find(".popup").hide();
    $(obj).parent().find(".popup").toggle();
}

// 팝업 닫기
function popClose(obj) {
    $(obj).parents(".popup").hide();
}

// 풋터 추가정보 open, close
function corpToggle(obj) {
    $(obj).toggleClass("on");
    $(obj).parents(".footer").find(".hide_corp_area").toggle();
}









