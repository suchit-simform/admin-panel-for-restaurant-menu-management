import { Image, Modal, type ModalProps } from "antd";
import React from "react";

const ImageUploadPreviewModal: React.FC<ModalProps & { src: string }> = ({ src, ...restModalProps }) => {
  return (
    <Modal {...restModalProps}>
      <Image src={src} alt="Image Preview" style={{ width: "100%" }} preview={false} />
    </Modal>
  );
};

export const useImageUploadPreviewModal = () => {
  const [previewOpen, setPreviewOpen] = React.useState(false);
  const [previewImage, setPreviewImage] = React.useState("");
  const [previewTitle, setPreviewTitle] = React.useState("");

  return {
    previewOpen,
    setPreviewOpen,
    previewImage,
    previewTitle,
    setPreviewImage,
    setPreviewTitle,
  };
};

export default ImageUploadPreviewModal;
