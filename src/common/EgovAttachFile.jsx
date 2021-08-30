import React from 'react';

import * as EgovNet from 'context/egovFetch';
import { SERVER_URL } from 'context/config';

function EgovAttachFile({ boardFiles, mode, fnChangeFile, fnDeleteFile }) {
    function onClickDownFile(atchFileId, fileSn) {
        window.open(SERVER_URL + "/cmm/fms/FileDown.do?atchFileId=" + atchFileId + "&fileSn=" + fileSn + "");
    }

    function onClickDeleteFile(atchFileId, fileSn, fileIndex) {
        const formData = new FormData();
        formData.set("atchFileId", atchFileId);
        formData.set("fileSn", fileSn);
        console.log(atchFileId, fileSn, fileIndex);
        const requestOptions = {
            method: "POST",
            headers: {
                //'Content-type': 'multipart/form-data'
            },
            body: formData
        }
        EgovNet.requestFetch("/cmm/fms/deleteFileInfsAPI.do",
            requestOptions,
            function (json) {
                console.log("===>>> board file delete= " + JSON.stringify(json));
                if (json != undefined)
                    if (json.resultCode == 0) {
                        // 성공
                        console.log("OK fileIndex = " + fileIndex);
                        debugger;
                        const _deleteFile = boardFiles.splice(fileIndex, 1);
                        const _boardFiles = Object.assign([], boardFiles);
                        fnDeleteFile(_boardFiles);
                    } else {
                        alert("ERR : " + json.resultMessage);
                    }
            }
        );
    }

    function onChangeFileInput(e) {
        console.log("===>>> e = " + e.target.files[0]);
        fnChangeFile(e.target.files[0]);
    }

    let filesTag = [];

    if (boardFiles != undefined) {
        boardFiles.forEach(function (item, index) {
            filesTag.push(
                <>
                    <span>
                        <a key={index} href={"#LINK"} onClick={function (e) {
                            e.preventDefault();
                            onClickDownFile(item.atchFileId, item.fileSn);
                        }} download>
                            {item.orignlFileNm}
                        </a>
                        <span>
                            [{item.fileMg}byte]
                        </span>
                    </span>
                </>
            );

            if (mode == "edit") {
                filesTag.push(
                    <img alt="파일 삭제" src="/images/btn/bu5_close.gif" width="19" height="18"
                        onClick={(e) => {
                            onClickDeleteFile(item.atchFileId, item.fileSn, index);
                        }}
                    />
                );
            }
        });


    }

    // <dl>
    //     <dt>첨부</dt>
    //     <dd>
    //         <span>
    //             <a href="">file_namefile_namefile_name.hwp</a> <span>[3626] byte</span>
    //         </span>
    //         <span>
    //             <a href="">file_namefile_namefile_name.hwp</a> <span>[3626] byte</span>
    //         </span>
    //     </dd>

    // </dl>


    return (
        <div className="board_attach">
            <dl>
                <dt>첨부</dt>
                {filesTag}
            </dl>
            {(mode == "edit" || mode == "new") && <input name="file_0" id="egovComFileUploader" type="file" onChange={e => onChangeFileInput(e)}></input>}
        </div>
    );
}

export default EgovAttachFile;