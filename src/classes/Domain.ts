import App from "../App";
import IQueryData from "../interfaces/db/IQueryData";
import User from "./User";

class Domain {
    readonly name: string;

    static create(data: IQueryData, user: User, onSuccess: Function, onError: Function) {
        App.getDBInstance().execute('add_new_domain', data, () => {
            onSuccess(new Domain(data.name));
        }, onError, user)
    }

    constructor(name: string) {
        this.name = name
    }

    changeIsFavouriteRow(isFavourite: boolean, user: User, onSuccess: Function, onError: Function)
}