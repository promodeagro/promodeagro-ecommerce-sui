import React from "react";
import { Modal, Button } from "antd";

const LogoutConfirmation = ({ visible, onCancel, onConfirm }) => {
  return (
    <Modal
    open={visible}
    //title="Logout"
    //centered
    width={350} 
    onCancel={onCancel}
    footer={null}
  >
    <p style={{ textAlign: "center", fontWeight: "bold" }} className="text-base mt-4">Are you sure you want to log out?</p>
    <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
      <Button key="cancel" onClick={onCancel} style={{ border: "1px solid black", width: "80px" }} >
        Cancel
      </Button>
      <Button key="confirm" onClick={onConfirm} style={{ backgroundColor: "red", color: "white", width: "50px", marginLeft: "6px" }} >
        Yes
      </Button>
    </div>
  </Modal>
  );
};

export default LogoutConfirmation;
