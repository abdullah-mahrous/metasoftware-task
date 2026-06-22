import { Request, Response, NextFunction } from "express";

const errorHandler = ( err: any, req: Request, res: Response, next: NextFunction ) => {
    console.log(err.message);

    if (err.code === 11000) {
        return res.status(409).json({
            success: false,
            message: "Email already registered",
        });
    }

    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        success: false,
        message: err.message || "Internal server error",
    });
};

export default errorHandler;