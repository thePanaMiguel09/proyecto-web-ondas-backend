import { Router } from "express";
import {
  createAdmin,
  deleteUser,
  getUsers,
  registrarUsuario,
  upDateUser,
} from "../controllers/user.controllers";
import { verifyToken } from "../middlewares/validate-token";
import { authorizeRoutes } from "../middlewares/authorize-roles";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: Endpoints para la gestión de usuarios
 */

/**
 * @swagger
 * /usuarios:
 *   get:
 *     summary: Obtener todos los usuarios registrados
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Usuarios obtenidos con éxito
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Usuario'
 *       500:
 *         description: Error al obtener usuarios
 */
router.get("/", verifyToken, authorizeRoutes("coordinador"), getUsers);

/**
 * @swagger
 * /usuarios/register:
 *   post:
 *     summary: Completar el perfil de un usuario con rol "pendiente"
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - primerNombre
 *               - primerApellido
 *               - tipoIdentificacion
 *               - numeroIdentificacion
 *               - fechaNacimiento
 *               - lugarNacimiento
 *               - edad
 *               - numeroTelefonico
 *               - institucion
 *               - rol
 *             properties:
 *               id:
 *                 type: string
 *                 example: 664000a3e80b2e0b6c4b7f9d
 *               primerNombre:
 *                 type: string
 *                 example: Juan
 *               segundoNombre:
 *                 type: string
 *                 example: Carlos
 *               primerApellido:
 *                 type: string
 *                 example: Pérez
 *               segundoApellido:
 *                 type: string
 *                 example: Gómez
 *               tipoIdentificacion:
 *                 type: string
 *                 example: CC
 *               numeroIdentificacion:
 *                 type: string
 *                 example: "123456789"
 *               fechaNacimiento:
 *                 type: string
 *                 format: date
 *                 example: 2005-03-15
 *               lugarNacimiento:
 *                 type: string
 *                 example: Bogotá
 *               edad:
 *                 type: integer
 *                 example: 18
 *               numeroTelefonico:
 *                 type: string
 *                 example: "3001234567"
 *               institucion:
 *                 type: ObjectID
 *                 example: 68bxyz3r5tg
 *               rol:
 *                 type: string
 *                 enum: [estudiante, docente]
 *                 example: estudiante
 *               gradoEscolar:
 *                 type: string
 *                 example: "10°"
 *               materiaAsignada:
 *                 type: string
 *                 example: Matemáticas
 *     responses:
 *       200:
 *         description: Perfil registrado exitosamente
 *       400:
 *         description: Usuario ya registrado o rol inválido
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.post(
  "/register",
  verifyToken,
  authorizeRoutes("coordinador"),
  registrarUsuario
);

router.delete("/:id", verifyToken, authorizeRoutes("coordinador"), deleteUser);

router.patch("/:id", verifyToken, authorizeRoutes("coordinador"), upDateUser);

//falta
router.get("/profile", verifyToken, getUsers);

router.post("/create-admin", createAdmin);

export default router;
