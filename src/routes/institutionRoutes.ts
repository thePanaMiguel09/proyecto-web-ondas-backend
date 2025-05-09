import { Router } from "express";
import {
  createInstitution,
  getAllInstitution,
  getSingleInstitution,
  upDateInstitution,
} from "../controllers/institution.controllers";

const router = Router();

router.post("/", createInstitution);

router.get("/", getAllInstitution);

router.get("/:id", getSingleInstitution);

router.patch("/:id", upDateInstitution);

export default router;
