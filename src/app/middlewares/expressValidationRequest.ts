import { Request, Response, NextFunction } from 'express';
import { validationResult, ValidationChain } from "express-validator";

const expressValidationRequest = (validationSchema: ValidationChain[]) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // Run all validations
      await Promise.all(validationSchema.map(validation => validation.run(req)));
      
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({
          status: "fail",
          message: "Validation Error",
          errorMessages: errors.array().map(error => ({
            path: (error as any).path,
            message: error.msg
          }))
        });
        return;
      }
      return next();
    } catch (error) {
      next(error);
    }
  };

export default expressValidationRequest;