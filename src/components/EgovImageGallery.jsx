import React from 'react';
import { SERVER_URL } from 'config';

function EgovImageGallery({ boardFiles }) {

    let filesTag = [];

    if (boardFiles !== undefined) {
        boardFiles.forEach(function (item, index) {
            filesTag.push(
                <React.Fragment key={index}>
                    <img src={`${SERVER_URL}/image?atchFileId=${item.atchFileId}&fileSn=${item.fileSn}`} alt=""  /><br />
                </React.Fragment>
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