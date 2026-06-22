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
    paths: {
  "/api/test": {
    get: {
      summary: "Test endpoint",
      tags: ["Test"],
      responses: {
        200: {
          description: "Success",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: {
                    type: "boolean",
                    example: true
                  },
                  message: {
                    type: "string",
                    example: "Swagger is working"
                  }
                }
              }
            }
          }
        }
      }
    }
  }
},
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

console.log(API_SPECS);


if (fs.existsSync("/var/task/src/routes/posts.routes.ts")) {
  const content = fs.readFileSync(
    "/var/task/src/routes/posts.routes.ts",
    "utf8"
  );

  console.log(content.substring(0, 1500));
}

export default API_SPECS;
