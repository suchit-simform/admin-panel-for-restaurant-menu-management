import type { RcFile, UploadFile } from "antd/es/upload";
import type { NormFileEvent } from "src/components/atoms/ImageUpload/lib/type";

// Convert file to base64 for preview
export const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export const normFile = (e: NormFileEvent): UploadFile[] => (Array.isArray(e) ? e : (e?.fileList?.slice(-1) ?? [])); // always keep only the latest file
