import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import swaggerUi from "swagger-ui-express";

import { connectDB } from "./config/dataBaseConnection";

import userRoutes from "./routes/userRoutes";
import institutionRoutes from "./routes/institutionRoutes";
import projectRoutes from "./routes/ProjectRoutes";
import authRoutes from "./routes/authRoutes";

import { swaggerSpec } from "./swagger";

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

app.get("/swagger.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

app.use("/auth", authRoutes);

app.use("/users", userRoutes);

app.use("/institutions", institutionRoutes);

app.use("/projects", projectRoutes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en el puerto ${PORT}`);
  console.log(`Swagger disponible en http://localhost:${PORT}/api-docs`);
});
