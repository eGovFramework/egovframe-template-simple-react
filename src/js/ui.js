import $ from 'jquery';

$(() => {
  // 메인화면 미니보드
  $('.mini_board .tab li a').on('click', function (e) {
    e.preventDefault();
    $(this).addClass('on');
    $(this).parent().siblings().find('a').removeClass('on');

    let idx = $('.mini_board .tab li a').index(this);
    $('.mini_board .list > div').hide();
    $('.mini_board .list > div').eq(idx).show();
  });

  /* 전체메뉴 */
  // 웹
  $('.btnAllMenu').on('click', function () {
    $(this).toggleClass('active');
    if ($('.all_menu.WEB').is(':visible')) {
      $('.all_menu.WEB').slideUp(150);
      $(this).attr('title', '전체메뉴 닫힘');
    } else {
      $('.all_menu.WEB').slideDown(150);
      $(this).attr('title', '전체메뉴 열림');
    }
  });
  // 모바일 전체메뉴 열기
  $('.btnAllMenuM').on('click', function () {
    $('.all_menu.Mobile').stop().animate(
      {
        left: 0,
      },
      200,
    );
    $(this).attr('title', '전체메뉴 열림');
  });
  // 닫기
  $('.user_info_m .close').on('click', () => {
    $('.all_menu.Mobile').stop().animate(
      {
        left: -800,
      },
      200,
    );
    $('.btnAllMenuM').attr('title', '전체메뉴 닫힘');
  });
  // Menu slide
  $('.all_menu.Mobile h3 a').on('click', function (e) {
    e.preventDefault();
    $(this).toggleClass('active');
    if ($(this).parent().next('ul').is(':visible')) {
      $(this).parent().next('ul').slideUp(150);
    } else {
      $(this).parent().next('ul').slideDown(150);
    }
  });

  /* Form */
  // Checkbox
  $('.f_chk').on('keyup', function (e) {
    e.preventDefault();
    if (window.event.keyCode == 13) {
      $(this).toggleClass('on');
      if ($(this).find('input').prop('checked')) {
        $(this).find('input').prop('checked', false);
      } else {
        $(this).find('input').prop('checked', true);
      }
    }
  });
  $('.f_chk input').on('click', function (e) {
    e.preventDefault();
    $(this).parent().toggleClass('on');
  });

  // Radio
  // $('.f_rdo').on('click', function() {
  //     $(this).addClass('on');
  //     $(this).siblings().removeClass('on');
  //     $(this).find('input').prop('checked', true);
  // });

  // 홈페이지 템플릿 소개팝업
  const templateInit = () => {
    const tg = $('.TEMPLATE_INTRO');
    const btn = $('.lnk_go_template');
    const btnClose = tg.find('.pop_header .close');

    const obj = tg;
    const objClose = btnClose;
    btn.on('click', (e) => {
      e.preventDefault();
      obj.show();
    });
    btnClose.on('click', (e) => {
      e.preventDefault();
      obj.hide();
    });
  };
  $('.lnk_go_template').length && templateInit();
});
