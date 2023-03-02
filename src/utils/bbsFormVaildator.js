const bbsFormVaildator = (formData) => {
    if (formData.get('nttSj') === null || formData.get('nttSj') === "") {
        alert("제목은 필수 값입니다.");
        return false;
    }
    if (formData.get('nttCn') === null || formData.get('nttCn') === "") {
        alert("내용은 필수 값입니다.");
        return false;
    }
    return true;
};

export default bbsFormVaildator;