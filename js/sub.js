$(function() {
    //
    // 제품 상세 페이지 (product_view.html)
    //
    
    // 물건 관심등록 숫자
    $("#product_like").click(function() {
        var likeCount = parseInt($(this).next(".count").text());

        if ($(this).is(":checked")) {
            likeCount += 1;
        } else {
            likeCount -= 1;
        }

        $(this).next(".count").text(likeCount);
    });
    
    //window height + window scrollY 값이 document height보다 클 경우,
    $(window).on("scroll", function() {
        if((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            // 물건 스크롤 로드
            productListSub();
         }
    });

    //
    // 제품 상세 페이지 (order_edit.html)
    //

    // 입력창 전부 입력시
    $(".order_form .text_input").on('input', checkInputValues);

    //
    // 제품 등록 페이지 (product_edit.html)
    //

    // 외부 영역 클릭시 팝업 닫기
    $(document).mouseup(function (e){
        var LayerPopup = $(".desc_pop");

        if(LayerPopup.has(e.target).length === 0){
            LayerPopup.css("display","none");
        }
    });

    // 카테고리
    $(".categories_option_li .chk").click(function() {
        var categoriesChk = $(".categories_option_li .chk:checked").length;
        if (categoriesChk > 2) {
            $(".categories_option_li .chk:not(:checked)").prop("disabled", true);
        } else {
            $(".categories_option_li .chk:not(:checked)").prop("disabled", false);
        }
    });

    
    // 미리보기 팝업 닫기
    $("#mask").click(function(e) {
        if ($(e.target).parents('.preview_wrap').length < 1 ){
        	previewClose();
        } 
    });

});

//
// 제품 상세 페이지 (product_list.html)
//

// 제품 무한 스크롤
function productListSub() {
    // 표지 인덱스 번호 부여
    var productIndex = $("#mainProductList_2").find("li").length;

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
            $("#mainProductList_2").append(addProduct);

        }

    }

}



//
// 제품 상세 페이지 (product_view.html)
//

// 작가의 다른 표지 슬라이드
var coverSwiper = new Swiper(".other_cover_slide", {
    spaceBetween: 10,
    slidesPerView: 4,
    navigation: {
        nextEl: ".cover-swiper-button-next",
        prevEl: ".cover-swiper-button-prev",
    },
});

// 탭
function optionTabs(obj, no) {
    $(obj).parents(".option_tabs").find("button").removeClass("active");
    $(obj).addClass("active");

    $(".option_list_area .option_list_box").hide();
    $(".optionContent_" + no).show();
}

// 옵션추가
function optionAddChk(obj, no) {
    var productPrice = 55000; // 기본 가격
    var optionArea = $(obj).parents(".option_list_area");
    var option = $(obj).parents(".option_label");
    var optionName = option.find(".txt").text(); // 옵션명
    var optionPrice = parseInt(option.find(".price").text()); // 옵션가격
    var optionCount = optionArea.find(".chk:checked").length; // 옵션개수

    var optionList = '<tr class="optionElement_' + no + '">' 
        + '<th>' + optionName + '</th>' 
        + '<td>' + optionPrice + '</td>'
        + '</tr>';
    
    // 선택된 옵션이 하나 이상일 경우
    if (optionCount > 0) { 
        $("#optionTable").show();
    } else {
        $("#optionTable").hide();
    }

    if ($(obj).is(":checked")) { // 선택되어 추가됨
        $("#optionAddList").append(optionList);
    } else { // 선택해제시 삭제
        $("#optionAddList").find(".optionElement_" + no).remove();
    }
    
    var totalPrice = productPrice;

    $("#optionAddList").find("td").each(function() {
        var price = parseInt($(this).text());
        totalPrice += price;
    });

    var totalNumWrite = totalPrice.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","); // 변경된 상품금액 세자리수 표시
    $('#totalPrice').text(totalNumWrite + "원");
    

}

// 섹션 이동 애니메이션
function tabMove(seq) {

    var offset = $("#productSection_" + seq).offset();

    $('html, body').animate({scrollTop : offset.top - 80}, 600);

}

//
// 제품 상세 페이지 (order_edit.html)
//

// 개인정보
function provideTab(obj) {
    $(obj).parent(".provide_consent").toggleClass("on");
    $(obj).parent(".provide_consent").find(".provide_content").stop().slideToggle();
}

// 입력창 전부 작성 시 버튼 활성화
function checkInputValues() {
    var allInputsCheck = true;

    $(".order_form .text_input").each(function() {
      if ($(this).val() === '') {
        allInputsCheck = false;
        return false; 
      }
    });

    // 버튼 활성화 여부 결정
    if (allInputsCheck) {
      $('#orderSendBtn').prop("disabled", false);
    } else {
      $('#orderSendBtn').prop("disabled", true); 
    }
}

//
// 제품 등록 페이지 (product_edit.html)
//

// 썸네일 파일 미리보기
function readFile(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        
        reader.onload = function (e) {
            $('#thumbnailImg').attr('src', e.target.result); 
            $(input).addClass("change");
        }
    
        reader.readAsDataURL(input.files[0]);
    }
}

// 설명 팝업 열기
function descPopOpen(obj) {
    $(obj).next(".desc_pop").show();
}

// 글자수 표시
function textLength(obj) {
    var length = $(obj).val().length;

    $("#text_length").html( length + "/20");
}

// 검색키워드
function keywordInput() {

    const keywordTextarea = document.getElementById("keywordTextarea");
    const keywordContainer = document.getElementById("keywordContainer");

    if (event.key === 'Tab' || event.key === 'Enter') {
        event.preventDefault();

        const selectedText = keywordTextarea.value.trim();

        if (selectedText) {
            if (keywordContainer.childElementCount < 2) {
                keywordTextarea.placeholder = "";
            }
            if (keywordContainer.childElementCount < 8) {
                const keywordElement = document.createElement("span");
                keywordElement.className = "tags";
                keywordElement.textContent = selectedText;

                const buttonElement = document.createElement("button");
                buttonElement.className = "cancle";
                buttonElement.textContent = "삭제";
                buttonElement.addEventListener("click", function() {
                    keywordElement.remove();
                });

                keywordElement.appendChild(buttonElement);
                keywordContainer.appendChild(keywordElement);

                // Clear input and set focus
                keywordTextarea.value = "";
                keywordTextarea.focus();
            } else {
                alert("키워드는 최대 8개만 등록이 가능합니다.");
            }
        }
    }
}


// 옵션 추가
function addOption(obj) {
    var name = $(obj).parents(".option_label_add").find(".name").val();
    var price = $(obj).parents(".option_label_add").find(".price").val();

    var optionList = '<li class="option_label">'
            + '<div class="option_txt">'
            + '<input type="text" class="name" name="option_name_edit" title="추가옵션" maxlength="25" value="' + name + '" readonly="readonly" />'
            + '</div>'
            + '<input type="text" class="price" name="option_price_edit" title="추가옵션금액" value="+ ' + price + '" readonly="readonly" />'
            + '<div class="btn_box">'
            + '<button type="button" class="btn modify" onclick="optionEdit(this)">수정</button>'
            + '<button type="button" class="btn cancle" onclick="optionCancle(this)">삭제</button>'
            + '<button type="button" class="btn main storage" onclick="optionStorage(this)" style="display:none;">저장</button>'
            + '</div>'
            + '</li>';

    $(obj).parents(".option_list_box").prepend(optionList);
}

// 옵션 수정
function optionEdit(obj) {
    var optionContents = $(obj).parents(".option_label");
    var name = $(optionContents).find(".name");
    var price = $(optionContents).find(".price");

    // 입력창 활성화
    $(name).attr("readonly", false);
    $(price).attr("readonly", false);

    // 버튼 변경
    $(optionContents).find(".cancle").css("display","none");
    $(optionContents).find(".storage").css("display","block");
    $(obj).css("display","none");
}

// 옵션 변경
function optionStorage(obj) {
    var optionContents = $(obj).parents(".option_label");
    var name = $(optionContents).find(".name");
    var price = $(optionContents).find(".price");

    // 입력창 비활성화
    $(name).attr("readonly", true);
    $(price).attr("readonly", true);

    // 버튼 변경
    $(optionContents).find(".cancle").css("display","block");
    $(optionContents).find(".modify").css("display","block");
    $(obj).css("display","none");
}

// 옵션 삭제
function optionCancle(obj) {
    $(obj).parents(".option_label").remove();
}

// 탭
function stepMoveScroll(no) {
    var offset = $(".step_" + no).offset();

    $('html, body').animate({scrollTop : offset.top - 100}, 600);
}

// 미리보기 화면 열기
function previewView() {
    $("#mask").show();
    $("body").css("overflow", "hidden");
}

// 미리보기 화면 닫기
function previewClose() {
    $("#mask").hide();
    $("body").css("overflow", "auto");
}







