import { UploadOutlined } from "@ant-design/icons";
import { App, Form, Upload } from "antd";
import type { RcFile, UploadFile } from "antd/lib/upload/interface";
import React, { useEffect, useState } from "react";
import { CLOUD_NAME, MAX_COUNT, MAX_MB, UPLOAD_PRESET } from "src/components/atoms/ImageUpload/lib/constant";
import type { CustomRequestUploadOptions } from "src/components/atoms/ImageUpload/lib/type";
import { getBase64, normFile } from "src/components/atoms/ImageUpload/lib/util";
import type { CloudinaryResponse } from "src/types/common";

type Props = {
  isEdit?: boolean;
  handlePreviewCallback: (previewData: { previewImage: string; previewTitle: string; previewOpen: boolean }) => void;
};

const ImageUploadFormItem: React.FC<Props> = ({ handlePreviewCallback, isEdit }) => {
  const { message } = App.useApp();
  const form = Form.useFormInstance();
  const imagesWatched = Form.useWatch("images", form);

  const [fileList, setFileList] = useState<RcFile[]>([]);

  useEffect(() => {
    if (isEdit && imagesWatched?.length) {
      setFileList(imagesWatched as RcFile[]);
    }
  }, [imagesWatched, isEdit]);

  // Client-side validation
  const beforeUpload = (file: RcFile) => {
    if (!file.type.startsWith("image/")) {
      message.error("Only image files allowed");
      return Upload.LIST_IGNORE;
    }
    if (file.size / 1024 / 1024 > MAX_MB) {
      message.error(`Image must be smaller than ${MAX_MB}MB`);
      return Upload.LIST_IGNORE;
    }

    setFileList([file]);
    return true;
  };

  // Upload handler using XMLHttpRequest for progress support
  const customRequest = async (options: CustomRequestUploadOptions) => {
    const { file, onProgress, onError, onSuccess } = options;

    try {
      const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", UPLOAD_PRESET);

      const xhr = new XMLHttpRequest();
      xhr.open("POST", url);

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable && onProgress) {
          const percent = (event.loaded / event.total) * 100;
          onProgress({ percent });
        }
      };

      xhr.onload = () => {
        if (xhr.status === 200) {
          const res: CloudinaryResponse = JSON.parse(xhr.responseText);
          onSuccess?.(res);
        } else {
          onError?.(new Error(`Upload failed with status ${xhr.status}`));
        }
      };

      xhr.onerror = () => {
        onError?.(new Error("Upload failed due to a network error"));
      };

      xhr.send(formData);
    } catch (err) {
      onError?.(err as Error);
    }
  };

  // Handle preview
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    const previewData = {
      previewImage: file.url || (file.preview as string),
      previewTitle: file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1),
      previewOpen: true,
    };

    handlePreviewCallback(previewData);
  };

  return (
    <Form.Item
      name="images"
      label={MAX_COUNT > 2 ? "Upload Images" : "Upload Image"}
      valuePropName="fileList"
      getValueFromEvent={normFile}
      rules={[{ required: true, message: "Please upload an image!" }]}
    >
      <Upload<CloudinaryResponse>
        listType="picture-card"
        maxCount={MAX_COUNT}
        accept="image/*"
        beforeUpload={beforeUpload}
        customRequest={customRequest}
        onPreview={handlePreview}
        onRemove={(file: UploadFile) => {
          setFileList((prev) => prev.filter((item) => item.uid !== file.uid));
        }}
      >
        {fileList.length < MAX_COUNT && (
          <div>
            <UploadOutlined />
            <div>Upload</div>
          </div>
        )}
      </Upload>
    </Form.Item>
  );
};

export default ImageUploadFormItem;
