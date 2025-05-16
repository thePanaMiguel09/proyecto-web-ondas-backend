import { Router } from "express";
import { createProject } from "../controllers/project.controllers";
import { verifyToken } from "../middlewares/validate-token";
import { authorizeRoutes } from "../middlewares/authorize-roles";

const router = Router();

/**
 * @swagger
 * /proyectos:
 *   post:
 *     summary: Crear un nuevo proyecto
 *     tags: [Proyectos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - titulo
 *               - area
 *               - objetivos
 *               - cronograma
 *               - presupuesto
 *               - institucion
 *               - docente
 *               - integrantes
 *               - estadoActual
 *             properties:
 *               id:
 *                 type: number
 *                 example: 1
 *               titulo:
 *                 type: string
 *                 example: Sistema de riego automatizado con sensores
 *               area:
 *                 type: string
 *                 example: Tecnología
 *               objetivos:
 *                 type: string
 *                 example: Automatizar el riego de cultivos escolares para optimizar el uso del agua
 *               cronograma:
 *                 type: string
 *                 example: De marzo a noviembre
 *               presupuesto:
 *                 type: number
 *                 example: 1500000
 *               institucion:
 *                 type: string
 *                 description: ID de la institución (ObjectId)
 *                 example: 6643bb0a35c2d8a16f8df20f
 *               docente:
 *                 type: string
 *                 description: ID del docente (ObjectId)
 *                 example: 6643bb0a35c2d8a16f8df30e
 *               integrantes:
 *                 type: array
 *                 description: Lista de IDs de estudiantes (ObjectId[])
 *                 items:
 *                   type: string
 *                   example: 6643bb0a35c2d8a16f8df40d
 *               observaciones:
 *                 type: string
 *                 example: Requiere autorización de dirección académica
 *               estadoActual:
 *                 type: string
 *                 enum: [Planeación, En desarrollo, Finalizado, Suspendido, Cancelado]
 *                 example: Planeación
 *     responses:
 *       201:
 *         description: Proyecto creado exitosamente
 *       401:
 *         description: Ya existe un proyecto con ese ID
 *       500:
 *         description: Error en el servidor
 */

router.post("/", verifyToken, authorizeRoutes("docente"), createProject);

export default router;
