import {NextFunction, Request, Response} from "express";

function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    res.status(404).json(err.message);
}

export default errorHandler