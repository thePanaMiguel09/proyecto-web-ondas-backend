import { Router } from "express";
import {
  createInstitution,
  getAllInstitution,
  getSingleInstitution,
  upDateInstitution,
} from "../controllers/institution.controllers";

const router = Router();

/**
 * @swagger
 * /instituciones:
 *   post:
 *     summary: Crea una nueva institución educativa
 *     tags: [Instituciones]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - location
 *               - id
 *             properties:
 *               name:
 *                 type: string
 *                 example: Colegio San José
 *               location:
 *                 type: object
 *                 properties:
 *                   city:
 *                     type: string
 *                     example: Bogotá
 *                   department:
 *                     type: string
 *                     example: Cundinamarca
 *               id:
 *                 type: number
 *                 example: 101
 *     responses:
 *       201:
 *         description: Institución creada exitosamente
 *       403:
 *         description: La institución ya existe
 *       500:
 *         description: Error en el servidor
 */

router.post("/", createInstitution);

/**
 * @swagger
 * /instituciones:
 *   get:
 *     summary: Obtener todas las instituciones registradas
 *     tags: [Instituciones]
 *     responses:
 *       200:
 *         description: Lista de instituciones obtenida exitosamente
 *       204:
 *         description: No existen instituciones
 *       500:
 *         description: Error al obtener las instituciones
 */

router.get("/", getAllInstitution);

/**
 * @swagger
 * /instituciones/{id}:
 *   get:
 *     summary: Obtener una institución por su ID
 *     tags: [Instituciones]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID numérico de la institución
 *         required: true
 *         schema:
 *           type: number
 *           example: 101
 *     responses:
 *       200:
 *         description: Institución encontrada
 *       404:
 *         description: Institución no encontrada
 *       500:
 *         description: Error al obtener la institución
 */

router.get("/:id", getSingleInstitution);

/**
 * @swagger
 * /instituciones/{id}:
 *   patch:
 *     summary: Actualiza información de una institución
 *     tags: [Instituciones]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID numérico de la institución
 *         required: true
 *         schema:
 *           type: number
 *           example: 101
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Colegio Técnico San José
 *               location:
 *                 type: object
 *                 properties:
 *                   city:
 *                     type: string
 *                     example: Medellín
 *                   department:
 *                     type: string
 *                     example: Antioquia
 *               isActive:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       200:
 *         description: Institución actualizada exitosamente
 *       404:
 *         description: Institución no encontrada
 *       500:
 *         description: Error al actualizar la institución
 */

router.patch("/:id", upDateInstitution);

export default router;
