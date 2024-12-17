let init = false;

export default function initPage() {
  const sessionUser = sessionStorage.getItem("loginUser");
  const sessionUserId = JSON.parse(sessionUser)?.id;

  if (sessionUserId === "admin") {
    // Mobile 서브메뉴 항목 클릭시 메뉴 닫기
    document.querySelectorAll(".all_menu.Mobile .submenu a").forEach((el) => {
      el.removeEventListener("click", handleSubmenuClick);
      el.addEventListener("click", handleSubmenuClick);
    });

    // 모바일 관리자 하위 메뉴 열고 닫기
    const nodes = document.querySelectorAll(".all_menu.Mobile h3 a");
    const last_submenu = nodes[nodes.length - 1];
    last_submenu.removeEventListener("click", handleLastSubmenuClick);
    last_submenu.addEventListener("click", handleLastSubmenuClick);
  }

  if (init) return;
  init = true;

  /* 전체메뉴 */
  // 웹
  const webMenuButton = document.querySelector(".btnAllMenu");
  if (webMenuButton) {
    webMenuButton.addEventListener("click", handleWebMenuToggle);
  }

  // 모바일 전체메뉴 열기
  const mobileMenuButton = document.querySelector(".btnAllMenuM");
  if (mobileMenuButton) {
    mobileMenuButton.addEventListener("click", handleMobileMenuOpen);
  }

  // 닫기
  const mobileUserInfoClose = document.querySelector(".user_info_m .close");
  if (mobileUserInfoClose) {
    mobileUserInfoClose.addEventListener("click", handleMobileMenuClose);
  }

  // PC 메뉴 항목 클릭시 메뉴 닫기
  const webAllMenu = document.querySelector(".all_menu.WEB");
  if (webAllMenu) {
    webAllMenu.addEventListener("click", handleWebMenuClose);
  }

  // 회원가입, 마이페이지 항목 클릭시 메뉴 닫기
  const webUserInfo = document.querySelector(".user_info");
  if (webUserInfo) {
    webUserInfo.addEventListener("click", handleWebMenuClose);
  }

  // 회원가입, 마이페이지 항목 클릭시 모바일 전체메뉴 열기
  const mobileUserInfo = document.querySelector(".user_info_m");
  if (mobileUserInfo) {
    mobileUserInfo.addEventListener("click", handleMobileMenuClose);
  }

  // Mobile 서브메뉴 항목 클릭시 메뉴 닫기
  document.querySelectorAll(".all_menu.Mobile .submenu a").forEach((el) => {
    el.removeEventListener("click", handleSubmenuClick);
    el.addEventListener("click", handleSubmenuClick);
  });

  // 모바일 하위 메뉴 열고 닫기
  document.querySelectorAll(".all_menu.Mobile h3 a").forEach((el) => {
    el.removeEventListener("click", handleMobileSubmenuToggle);
    el.addEventListener("click", handleMobileSubmenuToggle);
  });

  document.addEventListener("click", handleGlobalClick);

  // 홈페이지 템플릿 소개팝업
  const template = {
    init: function () {
      this.$tg = document.querySelector(".TEMPLATE_INTRO");
      this.$btn = document.querySelector(".lnk_go_template");
      this.$btnClose = this.$tg.querySelector(".pop_header .close");
      this.addEvent();
    },
    addEvent: function () {
      this.$btn.addEventListener("click", this.handleOpenPopup.bind(this));
      this.$btnClose.addEventListener(
        "click",
        this.handleClosePopup.bind(this)
      );
    },
    handleOpenPopup: function (e) {
      e.preventDefault();
      this.$tg.style.display = "block";
    },
    handleClosePopup: function (e) {
      e.preventDefault();
      this.$tg.style.display = "none";
    },
  };
  document.querySelector(".lnk_go_template") && template.init();
}

// Event Handlers
function handleSubmenuClick() {
  document.querySelector(".all_menu.Mobile").classList.add("closed");
}

function handleLastSubmenuClick(e) {
  e.preventDefault();
  const el = e.currentTarget;
  el.classList.toggle("active");

  const submenu = el.parentElement.nextElementSibling;
  if (submenu && submenu.matches(".submenu")) {
    if (submenu.classList.contains("closed")) {
      submenu.style.height = submenu.scrollHeight + "px";
      submenu.classList.remove("closed");
    } else {
      submenu.classList.add("closed");
      submenu.style.height = "";
    }
  }
}

function handleWebMenuToggle(e) {
  const el = e.target;

  el.classList.toggle("active");

  const menu = document.querySelector(".all_menu.WEB");
  if (menu.matches(".closed")) {
    menu.classList.remove("closed");
    el.title = "전체메뉴 닫힘";
  } else {
    menu.classList.add("closed");
    el.title = "전체메뉴 열림";
  }
}

function handleMobileMenuOpen(e) {
  document.querySelector(".all_menu.Mobile").classList.remove("closed");
  e.target.title = "전체메뉴 열림";
}

function handleMobileMenuClose() {
  document.querySelector(".all_menu.Mobile").classList.add("closed");
  document.querySelector(".btnAllMenuM").title = "전체메뉴 닫힘";
}

function handleWebMenuClose(e) {
  if (e.target.matches("a")) {
    document.querySelector(".all_menu.WEB").classList.add("closed");
    document.querySelector(".btnAllMenu").classList.remove("active");
    document.querySelector(".btnAllMenu").title = "전체메뉴 닫힘";
  }
}

function handleMobileSubmenuToggle(e) {
  e.preventDefault();
  const el = e.target;
  el.classList.toggle("active");

  const submenu = el.parentElement.nextElementSibling;
  if (submenu.matches(".closed")) {
    submenu.style.height = submenu.scrollHeight + "px";
    submenu.classList.remove("closed");
  } else {
    submenu.classList.add("closed");
    submenu.style.height = "";
  }
}

function handleGlobalClick(e) {
  const el = e.target;

  if (el.matches(".mini_board .tab li a")) {
    e.preventDefault();
    const tabs = el.closest(".tab");

    tabs.querySelectorAll("a").forEach((a) => a.classList.remove("on"));
    el.classList.add("on");

    const divs = document.querySelectorAll(".mini_board .list > div");
    divs.forEach((div) => (div.style.display = "none"));

    const idx = Array.prototype.indexOf.call(tabs.querySelectorAll("a"), el);
    divs[idx].style.display = "block";
  } else if (el.matches(".f_chk input")) {
    el.parentElement.classList[el.checked ? "add" : "remove"]("on");
  }
}
