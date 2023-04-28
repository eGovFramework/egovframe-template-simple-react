
export default function initPage() {

    /* 전체메뉴 */
        // 웹
        document.querySelector('.btnAllMenu').addEventListener('click', (e) => {
            const el = e.target;
    
            el.classList.toggle('active');
    
            const menu = document.querySelector('.all_menu.WEB');
            if (menu.matches('.closed')) {
                menu.classList.remove('closed');
                el.title = '전체메뉴 닫힘';
            } else {
                menu.classList.add('closed');
                el.title = '전체메뉴 열림';
            }
        });

        // 모바일 전체메뉴 열기
        document.querySelector('.btnAllMenuM').addEventListener('click', (e) => {
            document.querySelector('.all_menu.Mobile').classList.remove('closed');
            e.target.title = '전체메뉴 열림';
        });

        // 닫기
        document.querySelector('.user_info_m .close').addEventListener('click', () => {
            document.querySelector('.all_menu.Mobile').classList.add('closed');
            document.querySelector('.btnAllMenuM').title = '전체메뉴 닫힘';
        });

        // PC 메뉴 항목 클릭시 메뉴 닫기
        document.querySelector('.all_menu.WEB').addEventListener('click', (e) => {
            if (e.target.matches('a')) {
                document.querySelector('.all_menu.WEB').classList.add('closed');
                document.querySelector('.btnAllMenu').classList.remove('active');
                document.querySelector('.btnAllMenu').title = '전체메뉴 닫힘';
            }
        });
		// Mobile 서브메뉴 항목 클릭시 메뉴 닫기: 2023.04.13(목) 김일국 추가
        document.querySelectorAll('.all_menu.Mobile .submenu a')
			.forEach(el => el.addEventListener('click', (e) =>  {
            	document.querySelector('.all_menu.Mobile').classList.add('closed');
        }));
        // 모바일 하위 메뉴 열고 닫기
        document.querySelectorAll('.all_menu.Mobile h3 a')
            .forEach(el => el.addEventListener('click', (e) =>  {
                e.preventDefault();
                const el = e.target;

                el.classList.toggle('active');

                const submenu = el.parentElement.nextElementSibling;
                if (submenu.matches('.closed')) {
                    submenu.style.height = submenu.scrollHeight + 'px';
                    submenu.classList.remove('closed');
                } else {
                    submenu.classList.add('closed');
                    submenu.style.height = '';
                }
        }));

        // 현재 페이지에는 아직 존재하지 않은 요소에 대한 이벤트 처리
        document.addEventListener('click', (e) => {
            const el = e.target;

            // 메인화면 미니보드
            if (el.matches('.mini_board .tab li a')) {
                e.preventDefault();
                const el = e.target;
                const tabs = el.closest('.tab');

                // 탭 선택 상태 변경
                tabs.querySelectorAll('a').forEach(a => a.classList.remove('on'));
                el.classList.add('on');

                // 미니보드 표시 상태 변경
                const divs = document.querySelectorAll('.mini_board .list > div');
                divs.forEach(div => div.style.display = 'none');

                var idx = Array.prototype.indexOf.call(tabs.querySelectorAll('a'), el);
                divs[idx].style.display = 'block';
            }

            /* Form */
            // Checkbox
            else if (el.matches('.f_chk input')) {
             el.parentElement.classList[el.checked ? 'add' : 'remove']('on');
            }
        });
        // 홈페이지 템플릿 소개팝업
        const template = {
            init: function() {
                this.$tg = document.querySelector('.TEMPLATE_INTRO');
                this.$btn = document.querySelector('.lnk_go_template');
                this.$btnClose = this.$tg.querySelector('.pop_header .close');
                this.addEvent();
            },
            addEvent: function() {
                this.$btn.addEventListener('click', (e) =>  {
                e.preventDefault();
                this.$tg.style.display = 'block';
                // this.$tg.tabIndex = 0;
                // this.$tg.focus();
                });
            this.$btnClose.addEventListener('click', (e) =>  {
                e.preventDefault();
                this.$tg.style.display = 'none';
                // this.$btnClose.focus();
                });
            }
        }
    document.querySelector('.lnk_go_template') && template.init();

}