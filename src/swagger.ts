import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "API Proyecto Web",
    version: "1.0.0",
    description:
      "Documentación de la API usando Swagger en Express + TypeScript",
  },
  servers: [
    {
      url: "http://web-backend-production-365b.up.railway.app/",
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./src/routes/*.ts"], // Ruta donde Swagger va a buscar los comentarios JSDoc
};

export const swaggerSpec = swaggerJSDoc(options);
