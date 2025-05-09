import { Router } from "express";
import {createProject} from "../controllers/project.controllers";


const router = Router();


router.post("/", createProject);


export default router;



