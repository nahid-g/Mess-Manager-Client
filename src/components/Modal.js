import React from "react";
import "./Modal.css";

function Modal({ setOpenModal , wantToDelete }) {
    console.log(setOpenModal)
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
          </button>
        </div>
        <div className="title">
          <h1>Are You Sure You Want to Delete?</h1>
        </div>
        <div className="body">
          <p>You can check out profile</p>
        </div>
        <div className="footer">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
            id="cancelBtn"
          >
            Cancel
          </button>
          <button onClick={()=> wantToDelete(true)}>Continue</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;