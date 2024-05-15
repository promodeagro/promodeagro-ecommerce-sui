"use client";
import React, { useState } from "react";
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload, Modal } from 'antd';

const props = {
  name: 'file',
  action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

const ImportButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        style={{
          backgroundColor: "#E3E3E3",
          borderRadius: "5px",
          padding: "8px 15px 8px 15px",
        }}
        onClick={showModal}
      >
        Import
      </button>
      <Modal
        //title="Basic Modal"
        visible={isModalOpen} 
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{ 
          style: { backgroundColor: "black", color: "white" },
        }}
      >
        <Upload {...props}>
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
      </Modal>
    </>
  );
};

export default ImportButton;
