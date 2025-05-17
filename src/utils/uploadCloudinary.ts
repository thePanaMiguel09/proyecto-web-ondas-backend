import cloudinary from "../config/cloudinary-config";
import { v2 as cloudinaryV2 } from "cloudinary";
import fs from "fs";

export const uploadToCloudinary = async (
  filePath: string,
  folder = "proyectos/avances"
) => {
  try {
    const result = await cloudinaryV2.uploader.upload(filePath, {
      folder,
      resource_type: "auto",
    });

    // elimina el archivo temporal del servidor
    fs.unlinkSync(filePath);

    return result.secure_url;
  } catch (error) {
    throw new Error("Error al subir a Cloudinary: " + error);
  }
};
