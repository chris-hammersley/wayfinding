import React from "react";
import ReactDOM from "react-dom";
import Iframe from 'react-iframe';
import './main.css';

const Modal = ({ isShowing, hide, iframeUrl }) => isShowing ? ReactDOM.createPortal(
  <React.Fragment>
    <div className="modal-overlay">
      <button type="button" className="modal-close-button" data-dismiss="modal" aria-label="Close" onClick={hide}>
      <span aria-hidden="true">&times;</span>
      </button>
      <div className="iframe">
        <Iframe className="iframe" url={iframeUrl} width="100%" height="100%"/>
      </div>
      <div className="modal-wrapper">
        <div className="modal">
          <div className="modal-header">
            <button type="button" className="modal-close-button" data-dismiss="modal" aria-label="Close"  onClick={hide}>
            </button>
          </div>
          <div className="modal-content"></div>
        </div>
      </div>
    </div>
  </React.Fragment>, document.body
) : null;

export default Modal;