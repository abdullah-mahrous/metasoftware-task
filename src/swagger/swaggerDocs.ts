import swaggerJsdoc from "swagger-jsdoc";
import envVars from "../config/environment";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "meta software task (blogging system) APIs",
      version: "1.0.0",
      description:
        "A secure and scalable RESTful API for a personal blogging platform. with authenticate using JWT, and CRUD operations.",
    },
    servers: [
      {
        url: `http://localhost:${envVars.port}`,
        description: "Local server",
      },
      {
        url: "https://metasoftware-task.vercel.app",
        description: "Production server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./src/routes/*.ts"],
};

const API_SPECS = swaggerJsdoc(options);

import fs from "fs";

console.log(
  fs.existsSync("/var/task/src/routes/posts.routes.ts")
);

if (fs.existsSync("/var/task/src/routes/posts.routes.ts")) {
  const content = fs.readFileSync(
    "/var/task/src/routes/posts.routes.ts",
    "utf8"
  );

  console.log(content.substring(0, 1500));
}

export default API_SPECS;
