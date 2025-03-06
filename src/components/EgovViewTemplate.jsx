import { useEffect } from "react";

function EgovViewTemplate(props) {
  console.group("EgovViewTemplate");
  console.log("[Start] EgovViewTemplate ------------------------------");
  console.log("EgovViewTemplate [props] : ", props);

  useEffect(() => {
    return () => {};
  }, []);

  console.log("------------------------------EgovViewTemplate [End]");
  console.groupEnd("EgovViewTemplate");
  return (
    <div className="container">
      <div className="c_wrap"></div>
    </div>
  );
}

export default EgovViewTemplate;
