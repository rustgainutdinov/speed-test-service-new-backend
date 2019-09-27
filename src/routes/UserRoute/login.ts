import {NextFunction, Request, Response} from "express";
import checkOnParamsExist from "../../middleware/checkOnParamsExists";
import IQueryData from "../../interfaces/db/IQueryData";
import User from "../../classes/User";
import IUserDataToAuth from "../../interfaces/user/IUserDataToAuth";

function loginUserRoute(req: Request, res: Response, next: NextFunction): void {
    const userData: IQueryData = req.query;
    try {
        checkOnParamsExist(userData, ['email', 'pass']);
    } catch (e) {
        next(e);
        return
    }
    const user: User = new User(undefined, userData.email, userData.pass);
    user.login((dataToAuth: IUserDataToAuth) => {
        res.json(dataToAuth);
    }, next);
}

export default loginUserRoute