import React from 'react';
import { SERVER_URL } from 'context/config';
import debug from 'debug';
const log = debug('egov:EgovImageGallery');

const EgovImageGallery = ({ boardFiles, mode }) => {
  let filesTag = [];

  if (boardFiles !== undefined) {
    boardFiles.forEach((item, index) => {
      filesTag.push(
        <>
          <img
            key={index}
            src={`${SERVER_URL}/cmm/fms/getImage.do?atchFileId=${item.atchFileId}&fileSn=${item.fileSn}`}
            alt=""
          />
          <br />
        </>,
      );
    });
  }
  log('filesTag:', filesTag);

  return <div className="board_attach_img">{filesTag}</div>;
};

export default EgovImageGallery;
