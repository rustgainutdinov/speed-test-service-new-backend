import App from "../App";
import IQueryData from "../interfaces/db/IQueryData";
import User from "./User";
import IUrlsDataOnlyWithNameList from "../interfaces/url/IUrlsDataOnlyWithNameList";
import getNamesListFromUrlsDataOnlyWithNameList from "../methods/url/getNamesListFromUrlsDataOnlyWithNameList";

class Domain {
    readonly name: string;

    static create(data: IQueryData, user: User, onSuccess: Function, onError: Function) {
        App.getDBInstance().execute('add_new_domain', data, () => {
            onSuccess(new Domain(data.name));
        }, onError, user)
    }

    static getFullInfoAboutAllDomains(user: User, onSuccess: Function, onError: Function) {
        App.getDBInstance().execute('get_full_info_about_all_domains', null, onSuccess, onError, user);
    }

    constructor(name: string) {
        this.name = name
    }

    changeIsFavouriteField(isFavourite: boolean, user: User, onSuccess: Function, onError: Function) {
        App.getDBInstance().execute('change_domain_is_favourite_field', {
            isFavourite,
            domain: this.name
        }, onSuccess, onError, user);
    }

    remove(user: User, onSuccess: Function, onError: Function) {
        App.getDBInstance().execute('remove_domain', {domain: this.name}, onSuccess, onError, user);
    }

    getUrlsList(user: User, onSuccess: Function, onError: Function) {
        App.getDBInstance().execute('get_urls_list_by_domain', {name: this.name},
            (urlsDataOnlyWithNameList: IUrlsDataOnlyWithNameList) => {
                const namesList: Array<string> = getNamesListFromUrlsDataOnlyWithNameList(urlsDataOnlyWithNameList);
                onSuccess(namesList);
            }, onError, user
        );
    }
}

export default Domain