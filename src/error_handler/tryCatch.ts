import { Request, Response, NextFunction, RequestHandler } from 'express';

const tryCatch = (controller: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        await controller(req, res, next);
    } catch (error) {
        next(error);
    }
};

export default tryCatch;
