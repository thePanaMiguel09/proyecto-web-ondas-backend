import { Router } from "express";
import { login, getUsers } from "../controllers/user.controllers";
import { createStudent } from "../controllers/estudiante.controlles";
import { completarRegistro } from "../controllers/user.controllers";

const router = Router();

router.get("/", getUsers);

router.post("/login", login);

router.post("/register", completarRegistro);




export default router;
