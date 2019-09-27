import {NextFunction, Request, Response} from "express";

function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    res.status(500).json(err.message);
    console.log(err.message);
}

export default errorHandler