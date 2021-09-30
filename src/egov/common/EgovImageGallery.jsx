import React from 'react';
import { SERVER_URL } from 'context/config';

function EgovImageGallery({ boardFiles, mode }) {

    let filesTag = [];

    if (boardFiles !== undefined) {
        boardFiles.forEach(function (item, index) {
            filesTag.push(
                <>
                    <img key={index} src={`${SERVER_URL}/cmm/fms/getImage.do?atchFileId=${item.atchFileId}&fileSn=${item.fileSn}`} alt="" /><br />
                </>
            );
        });
    }
    console.log("filesTag : ", filesTag);
    console.groupEnd("EgovAttachFile");

    return (
        <div className="board_attach_img">
            {filesTag}
        </div>
    );
}

export default EgovImageGallery;