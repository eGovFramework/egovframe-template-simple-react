const EgovMenuHeader = ({ title, subTitle }) => {
  return (
    <>
      <div className="top_tit">
        <h1 className="tit_1">{title}</h1>
      </div>
      {subTitle && <h2 className="tit_2">{subTitle}</h2>}
    </>
  );
};

export default EgovMenuHeader;
