const EgovMenuHeader = ({ title, subTitle, showExampleLabel = false }) => {
  return (
    <>
      <div className="top_tit">
        <h1 className="tit_1">{title}</h1>
      </div>
      {subTitle && <h2 className="tit_2">{subTitle}</h2>}
      {showExampleLabel && <h2 className="tit_7">본 화면은 디자인 예시임</h2>}
    </>
  );
};

export default EgovMenuHeader;
