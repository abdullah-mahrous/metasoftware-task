// packeges
import express from 'express'
import cors from "cors";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import swaggerUi from "swagger-ui-express";
// configs
import envVars from "./config/environment";
import API_SPECS from "./swagger/swaggerDocs";
// middlewares
import errorHandler from './middlewares/errorHandler'
// routes
import authRoutes from "./routes/authRoutes";
import postsRoutes from "./routes/postsRoutes";

const app = express();

// Using helmet as a security middleware
app.use(helmet());

// CORS handling
app.use(
  cors({
    origin: envVars.corsOrigin,
  }),
);

// Body parsing with size limits to prevent Dos attacks
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// Preventing NoSQL injection with mongoSanitize
app.use(mongoSanitize());

// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(API_SPECS));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postsRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

app.use(errorHandler);

export default app;
