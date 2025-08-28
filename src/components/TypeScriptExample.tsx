import type { EgovComponentProps, LoginUser, PaginationInfo } from "@/types";
import type React from "react";
import { useCallback, useState } from "react";

// === Props 인터페이스 ===
interface TypeScriptExampleProps extends EgovComponentProps {
  /** 컴포넌트 제목 */
  title: string;
  /** 초기 카운트 값 */
  count: number;
  /** 활성 상태 여부 */
  isActive?: boolean;
  /** 버튼 클릭 핸들러 */
  onButtonClick?: () => void;
  /** 페이징 정보 */
  pagination?: PaginationInfo;
  /** 사용자 정보 */
  user?: LoginUser;
}

/**
 * TypeScript 지원 예제 컴포넌트
 */
const TypeScriptExample: React.FC<TypeScriptExampleProps> = ({
  title,
  count,
  isActive = false,
  onButtonClick,
  pagination,
  user,
  className = "",
  style = {},
  id,
  "aria-label": ariaLabel,
  "data-testid": testId,
}) => {
  // === State 정의 ===
  const [localCount, setLocalCount] = useState<number>(count);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  // === Event Handlers ===
  const handleIncrement = useCallback((): void => {
    setLocalCount((prev) => prev + 1);
    setMessage(`카운트가 ${localCount + 1}로 증가했습니다.`);
  }, [localCount]);

  const handleAsyncOperation = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    try {
      // 비동기 작업 시뮬레이션
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setLocalCount((prev) => prev + 5);
      setMessage("비동기 작업이 완료되었습니다!");
    } catch (error) {
      setMessage("오류가 발생했습니다.");
      console.error("Async operation failed:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleCustomClick = useCallback((): void => {
    if (onButtonClick) {
      onButtonClick();
    }
    setMessage("사용자 정의 액션이 실행되었습니다.");
  }, [onButtonClick]);

  // === Computed Values ===
  const statusText = isActive ? "활성" : "비활성";
  const currentPageInfo = pagination
    ? `${pagination.currentPageNo} / ${Math.ceil(
        pagination.totalRecordCount / pagination.recordCountPerPage
      )} 페이지`
    : "페이징 정보 없음";

  // === Render ===
  return (
    <div
      id={id}
      className={`egov-typescript-example ${className}`}
      style={{
        padding: "24px",
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        backgroundColor: isActive ? "#f8f9ff" : "#ffffff",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        ...style,
      }}
      aria-label={ariaLabel || `TypeScript 예제: ${title}`}
      data-testid={testId ?? ""}
      data-egov-component="TypeScriptExample"
    >
      {/* <TypeScriptTest title={"a"} /> */}
      {/* Header */}
      <header style={{ marginBottom: "20px" }}>
        <h3
          style={{
            margin: "0 0 8px 0",
            color: "#1e40af",
            fontSize: "20px",
            fontWeight: "600",
          }}
        >
          {title}
        </h3>
        <div
          style={{
            fontSize: "14px",
            color: "#6b7280",
            display: "flex",
            gap: "16px",
            flexWrap: "wrap",
          }}
        >
          <span>
            상태: <strong>{statusText}</strong>
          </span>
          <span>
            현재 카운트: <strong>{localCount}</strong>
          </span>
          {user && (
            <span>
              사용자: <strong>{user.name}</strong>
            </span>
          )}
        </div>
      </header>

      {/* Controls */}
      <div style={{ marginBottom: "20px" }}>
        <div
          style={{
            display: "flex",
            gap: "12px",
            marginBottom: "16px",
            flexWrap: "wrap",
          }}
        >
          <button
            type="button"
            onClick={handleIncrement}
            style={{
              padding: "8px 16px",
              backgroundColor: "#3b82f6",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "500",
              transition: "background-color 0.2s",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "#2563eb";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "#3b82f6";
            }}
          >
            카운트 증가 (+1)
          </button>

          <button
            type="button"
            onClick={handleAsyncOperation}
            disabled={isLoading}
            style={{
              padding: "8px 16px",
              backgroundColor: isLoading ? "#9ca3af" : "#10b981",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: isLoading ? "not-allowed" : "pointer",
              fontSize: "14px",
              fontWeight: "500",
              transition: "background-color 0.2s",
            }}
          >
            {isLoading ? "처리 중..." : "비동기 증가 (+5)"}
          </button>

          {onButtonClick && (
            <button
              type="button"
              onClick={handleCustomClick}
              style={{
                padding: "8px 16px",
                backgroundColor: "#8b5cf6",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "500",
              }}
            >
              사용자 정의 액션
            </button>
          )}
        </div>

        {/* Message Display */}
        {message && (
          <div
            style={{
              padding: "12px",
              backgroundColor: "#ecfdf5",
              border: "1px solid #d1fae5",
              borderRadius: "6px",
              color: "#065f46",
              fontSize: "14px",
            }}
            role="status"
            aria-live="polite"
          >
            💡 {message}
          </div>
        )}
      </div>

      {/* Information Display */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "16px",
          marginBottom: "20px",
        }}
      >
        {/* User Info Card */}
        {user && (
          <div
            style={{
              padding: "16px",
              backgroundColor: "#f3f4f6",
              borderRadius: "6px",
              border: "1px solid #d1d5db",
            }}
          >
            <h4
              style={{
                margin: "0 0 8px 0",
                fontSize: "16px",
                color: "#374151",
              }}
            >
              사용자 정보
            </h4>
            <dl style={{ margin: 0, fontSize: "14px" }}>
              <dt style={{ fontWeight: "600", color: "#4b5563" }}>ID:</dt>
              <dd style={{ margin: "0 0 8px 0" }}>{user.id}</dd>
              <dt style={{ fontWeight: "600", color: "#4b5563" }}>이름:</dt>
              <dd style={{ margin: "0 0 8px 0" }}>{user.name}</dd>
              {user.email && (
                <>
                  <dt style={{ fontWeight: "600", color: "#4b5563" }}>
                    이메일:
                  </dt>
                  <dd style={{ margin: 0 }}>{user.email}</dd>
                </>
              )}
            </dl>
          </div>
        )}

        {/* Pagination Info Card */}
        {pagination && (
          <div
            style={{
              padding: "16px",
              backgroundColor: "#f3f4f6",
              borderRadius: "6px",
              border: "1px solid #d1d5db",
            }}
          >
            <h4
              style={{
                margin: "0 0 8px 0",
                fontSize: "16px",
                color: "#374151",
              }}
            >
              페이징 정보
            </h4>
            <dl style={{ margin: 0, fontSize: "14px" }}>
              <dt style={{ fontWeight: "600", color: "#4b5563" }}>
                현재 페이지:
              </dt>
              <dd style={{ margin: "0 0 4px 0" }}>{currentPageInfo}</dd>
              <dt style={{ fontWeight: "600", color: "#4b5563" }}>
                페이지 크기:
              </dt>
              <dd style={{ margin: "0 0 4px 0" }}>{pagination.pageSize}개</dd>
              <dt style={{ fontWeight: "600", color: "#4b5563" }}>
                전체 건수:
              </dt>
              <dd style={{ margin: 0 }}>
                {pagination.totalRecordCount.toLocaleString()}건
              </dd>
            </dl>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer
        style={{
          paddingTop: "16px",
          borderTop: "1px solid #e5e7eb",
          fontSize: "12px",
          color: "#6b7280",
        }}
      >
        <p style={{ margin: 0 }}>ℹ️ TypeScript 지원 예제입니다.</p>
      </footer>
    </div>
  );
};

export default TypeScriptExample;
