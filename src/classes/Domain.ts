import App from "../App";
import IQueryData from "../interfaces/db/IQueryData";
import User from "./User";
import IUrlsDataOnlyWithNameList from "../interfaces/url/IUrlsDataOnlyWithNameList";
import getNamesListFromUrlsDataOnlyWithNameList from "../methods/url/getNamesListFromUrlsDataOnlyWithNameList";
import IFullDomainData from "../interfaces/domain/IFullDomainData";
import IIsPageDeleted from "../interfaces/domain/IIsPageDeleted";

class Domain {
    readonly name: string;

    static create(data: IQueryData, user: User, onSuccess: Function, onError: Function) {
        this.isDomainExist(data.domain, user, (isDomainExist: boolean) => {
            if (!isDomainExist) {
                this.addNewDomain(data, user, onSuccess, onError);
                return
            }
            const domain: Domain = new Domain(data.domain);
            domain.getIsDeletedField(user, (isDomainDeletedData: Array<IIsPageDeleted>) => {
                if (isDomainDeletedData[0] && isDomainDeletedData[0].is_deleted) {
                    domain.returnFromTrash(user, onSuccess, onError);
                } else {
                    onError(new Error('Домен уже существует'));
                }
            }, onError);
        }, onError);
    }

    private static addNewDomain(data: IQueryData, user: User, onSuccess: Function, onError: Function) {
        App.getDBInstance().execute('add_new_domain', data, () => {
            onSuccess(new Domain(data.name));
        }, onError, user)
    }

    private static isDomainExist(domain: string, user: User, onSuccess: Function, onError: Function) {
        App.getDBInstance().execute('get_full_info_about_domain', {domain}, (result: Array<IFullDomainData>) => {
            try {
                result[0].domain;
                onSuccess(true);
            } catch (e) {
                onSuccess(false);
            }
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

    getUrlsListWithPerformance(user: User, onSuccess: Function, onError: Function) {
        App.getDBInstance().execute('get_urls_list_with_performance', {domain: this.name}, onSuccess, onError, user);
    }

    private getIsDeletedField(user: User, onSuccess: Function, onError: Function) {
        App.getDBInstance().execute('get_is_deleted_domain_field', {domain: this.name}, onSuccess, onError, user);
    }

    private returnFromTrash(user: User, onSuccess: Function, onError: Function) {
        App.getDBInstance().execute('return_domain_from_trash', {domain: this.name}, onSuccess, onError, user);
    }
}

export default Domain