import React from "react";
import ReactDOM from "react-dom";
import { IoCloseOutline } from "react-icons/io5";
import Iframe from 'react-iframe';

const Modal2 = ({ isShowing, hide, iframeUrl }) => {
  if (!isShowing) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-wrapper">
        <div className="modal">
          <div className="modal-header">
            <button type="button" className="modal-close-button" onClick={hide}>
              <IoCloseOutline size={30} />
            </button>
          </div>
          <div className="modal-content">
            <Iframe url={iframeUrl} width="100%" height="600px" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal2;