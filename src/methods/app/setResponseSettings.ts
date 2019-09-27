import {NextFunction, Request, Response} from "express";

function setResponseSettings(req: Request, res: Response, next: NextFunction) {
    res.contentType('application/json');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
}

export default setResponseSettings