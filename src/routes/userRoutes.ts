import { Router } from "express";
import { getUsers,registrarUsuario } from "../controllers/user.controllers";


const router = Router();

router.get("/", getUsers);

router.post("/register", registrarUsuario);

export default router;
