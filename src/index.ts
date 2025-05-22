import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";

import { connectDB } from "./config/dataBaseConnection";

import userRoutes from "./routes/userRoutes";
import institutionRoutes from "./routes/institutionRoutes";
import projectRoutes from "./routes/ProjectRoutes";
import authRoutes from "./routes/authRoutes";

import { swaggerSpec } from "./swagger";

const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.json());

connectDB();

app.get("/api", (_req, res) => {
  res.status(200).json({ message: "Conectado al backend" });
});

app.get("/swagger.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

app.use("/api/auth", authRoutes);

app.use("/api/users", userRoutes);

app.use("/api/institutions", institutionRoutes);

app.use("/api/projects", projectRoutes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en el puerto ${PORT}`);
  console.log(`Swagger disponible en http://localhost:${PORT}/api-docs`);
});
