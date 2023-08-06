import React from "react";
import './Popup.css'

function Popup(props) {

  return (
    <div
      className={`popup ${
        props.isOpen ? "popup_opened" : ""
      }`}
      onClick={props.closeOverlay}
    >
      <div className="popup__container">
        <button
          type="button"
          className="popup__close-button"
          onClick={props.onClose}
        ></button>
        <div className={`popup__registr-icon
            ${
              props.isOk ? "popup__registr-icon_ok" : "popup__registr-icon_er"
            }`}
          onClick={props.onClose}
          alt="icon popup"
        />
        <h3 className="popup__container-title
            popup__container-title_sing">
              {props.title}
        </h3>
      </div>
    </div>
  );
};

export default Popup;
