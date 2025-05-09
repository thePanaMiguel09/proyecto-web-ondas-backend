import mongoose from "mongoose";

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGO_URL as string);
    console.log("🟢 MongoDB conectado correctamente");
  } catch (error) {
    console.error(
      "🔴 Error al conectar con MongoDB:",
      (error as Error).message
    );
    process.exit(1);
  }
};
