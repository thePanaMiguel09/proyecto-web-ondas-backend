import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/dataBaseConnection";
import userRoutes from "./routes/userRoutes";
import institutionRoutes from "./routes/institutionRoutes";
import projectRoutes from "./routes/ProjectRoutes";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.json());

connectDB();

app.get("/", (_req, res) => {
  res.status(200).json({ message: "Conectado al backend" });
});

app.use("/users", userRoutes);

app.use("/institutions", institutionRoutes);

app.use("/projects", projectRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en el puerto ${PORT}`);
});
