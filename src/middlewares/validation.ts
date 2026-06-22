import { ZodType } from "zod";
import { Request, Response, NextFunction } from "express"
import { appError } from "../utilities/appError";

const validation = (validationSchema: ZodType) => (req: Request, _res: Response, next: NextFunction) => {
    const result = validationSchema.safeParse(req.body);

    if(!result.success) {
        let errors = result.error.issues.map((issue) => issue.message).join(", ")

        return next(new appError(errors, 400));
    }

    req.body = result.data;
    next();
}

export default validation;
