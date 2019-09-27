import {NextFunction, Request, Response} from 'express';
import User from "../../classes/User";
import checkOnParamsExist from "../../middleware/checkOnParamsExists";
import IQueryData from "../../interfaces/db/IQueryData";
import IUserDataToAuth from "../../interfaces/user/IUserDataToAuth";

function createUserRoute(req: Request, res: Response, next: NextFunction): void {
    const userData: IQueryData = req.query;
    try {
        checkOnParamsExist(userData, ['email', 'pass', 'name']);
    } catch (e) {
        next(e);
        return
    }
    User.create(userData, (user: User) => {
        user.login((dataToAuth: IUserDataToAuth) => {
            res.json(dataToAuth);
        }, next);
    }, next);
}

export default createUserRoute