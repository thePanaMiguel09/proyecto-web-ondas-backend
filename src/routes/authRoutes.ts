import { Router } from "express";
import { login, signUp } from "../controllers/auth.controllers";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Autenticación
 *   description: Endpoints para registrarse e iniciar sesión
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Iniciar sesión de usuario
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: mySecretPassword
 *     responses:
 *       404:
 *          description: Tú correo de usuario no ha sido encontrado
 *       200:
 *         description: Usuario autenticado correctamente
 *       401:
 *         description: Contraseña Incorrecta
 *       500:
 *         description: Error interno del servidor
 */
router.post("/login", login);

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Crear Cuenta
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: juan@example.com
 *               password:
 *                 type: string
 *                 example: myStrongPassword
 *     responses:
 *       401: Ya existe una cuenta con este correo
 *       201:
 *         description: Cuenta creada con éxito
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error interno del servidor
 */
router.post("/signup", signUp);

export default router;
