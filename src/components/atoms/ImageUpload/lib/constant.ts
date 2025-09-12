export const MAX_MB = 2;
export const MAX_COUNT = 1;

// Use environment variables for Cloudinary details
export const CLOUD_NAME = import.meta.env.VITE_APP_CLOUDINARY_CLOUD_NAME || "";
export const UPLOAD_PRESET = import.meta.env.VITE_APP_CLOUDINARY_UPLOAD_PRESET || "";
