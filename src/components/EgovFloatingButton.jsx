import "../css/floatingButton.css";
import { SERVER_URL } from "../config/index.js";

function EgovFloatingButton() {
  let aiWindow;
  const openAiWindow = () => {
	if (!aiWindow || aiWindow.closed) {
		let url = "/ai_rag.html?serverUrl=" + SERVER_URL;
		// 모니터 가로 해상도 - 팝업창 가로 크기 = 오른쪽에 붙는 X 좌표
		var leftPos = window.screen.width - 600;
		leftPos += window.screenLeft; // 듀얼 모니터일 때
		var topPos = 0; // 화면 상단에 붙임
		const options = "width=600,height=700,left="+leftPos+",top="+topPos+",scrollbars=yes,resizable=yes";
		// 새 창 열기
		aiWindow = window.open(url, "aiWindow", options);
	}else{
		// 이미 열려있다면 기존 창을 활성화(포커스)
		aiWindow.focus();
	}
  };

  return (
    <div className="floating-container">
        <div className="floating-button" onClick={openAiWindow}>
            AI
        </div>
    </div>
  );
}
export default EgovFloatingButton;