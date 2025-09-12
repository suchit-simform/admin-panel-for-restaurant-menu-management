import type { UploadFile } from "antd";
import type { UploadProps } from "antd/es/upload";
import type { CloudinaryResponse } from "src/types/common";

export type CustomRequestUploadOptions = Parameters<NonNullable<UploadProps<CloudinaryResponse>["customRequest"]>>[0];

export type NormFileEvent = UploadFile[] | { fileList: UploadFile[] };

export interface CloudinaryUploadOptions {
  onProgress?: (progress: number) => void;
}
