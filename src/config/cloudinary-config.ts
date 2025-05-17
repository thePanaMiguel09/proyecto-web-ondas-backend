// src/config/cloudinary.ts
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params:  async (req, file) => {
    return {
      folder: "avances_proyectos",
      allowed_formats: ["jpg", "jpeg", "png", "webp", "pdf"],
      public_id: `${Date.now()}-${file.originalname}`,
    };
  }, // nombre de la carpeta en tu Cloudinary
   },
);

export { cloudinary, storage };
