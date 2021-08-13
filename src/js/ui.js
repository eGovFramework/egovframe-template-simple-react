import $ from 'jquery';

$(function() {

    /* 전체메뉴 */
        // 웹
        $('.btnAllMenu').on('click', function() {
            $(this).toggleClass('active');
            if ( $('.all_menu.WEB').is(':visible') ) {
                $('.all_menu.WEB').slideUp(150);
                $(this).attr('title', '전체메뉴 닫힘');
            } else {
                $('.all_menu.WEB').slideDown(150);
                $(this).attr('title', '전체메뉴 열림');
            }
        });
        // 모바일 전체메뉴 열기
        $('.btnAllMenuM').on('click', function() {
            $('.all_menu.Mobile').stop().animate({
                left: 0
            }, 200, function() {});
            $(this).attr('title', '전체메뉴 열림');
        });
        // 닫기
        $('.user_info_m .close').on('click', function() {
            $('.all_menu.Mobile').stop().animate({
                left: -800
            }, 200, function() {});
            $('.btnAllMenuM').attr('title', '전체메뉴 닫힘');
        });
        // Menu slide
        $('.all_menu.Mobile h3 a').on('click', function(e) {
            e.preventDefault();
            $(this).toggleClass('active');
            if ( $(this).parent().next('ul').is(':visible') ) {
                $(this).parent().next('ul').slideUp(150);
            } else {
                $(this).parent().next('ul').slideDown(150);
            }
        });
    
    /* Form */
        // Checkbox
        $('.f_chk').on('keyup', function(e) {
            e.preventDefault();
            if (window.event.keyCode == 13) {
                $(this).toggleClass('on');
                if ( $(this).find('input').prop('checked') ) {
                    $(this).find('input').prop('checked', false);
                } else {
                    $(this).find('input').prop('checked', true);
                }
            }
        });
        $('.f_chk input').on('click', function(e) {
            e.preventDefault();
            $(this).parent().toggleClass('on');
        });

        // Radio
        $('.f_rdo').on('click', function() {
            $(this).addClass('on');
            $(this).siblings().removeClass('on');
            $(this).find('input').prop('checked', true);
        });
});