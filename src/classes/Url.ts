import IQueryData from "../interfaces/db/IQueryData";
import App from "../App";
import User from "./User";

class Url {
    readonly name: string;

    static create(data: IQueryData, user: User, onSuccess: Function, onError: Function) {
        App.getDBInstance().execute('add_new_url', data, () => {
            onSuccess(new Url(data.urlName))
        }, onError, user);
    }

    static getFullInfoAboutAllUrls(user: User, onSuccess: Function, onError: Function) {
        App.getDBInstance().execute('get_full_info_about_all_urls', null, onSuccess, onError, user);
    }

    static getAllUrls(user: User, onSuccess: Function, onError: Function) {
        App.getDBInstance().execute('get_all_urls', null, onSuccess, onError, user);
    }

    constructor(name: string) {
        this.name = name
    }

    changeIsFavouriteField(isFavourite: boolean, user: User, onSuccess: Function, onError: Function) {
        App.getDBInstance().execute('change_url_is_favourite_field', {
            url: this.name,
            isFavourite
        }, onSuccess, onError, user);
    }

    remove(user: User, onSuccess: Function, onError: Function) {
        App.getDBInstance().execute('remove_url', {
            url: this.name,
        }, onSuccess, onError, user);
    }
}

export default Url