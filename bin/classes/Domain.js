"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const App_1 = require("../App");
const getNamesListFromUrlsDataOnlyWithNameList_1 = require("../methods/url/getNamesListFromUrlsDataOnlyWithNameList");
class Domain {
    constructor(name) {
        this.name = name;
    }
    static create(data, user, onSuccess, onError) {
        this.isDomainExist(data.domain, user, (isDomainExist) => {
            if (!isDomainExist) {
                this.addNewDomain(data, user, onSuccess, onError);
                return;
            }
            const domain = new Domain(data.domain);
            domain.getIsDeletedField(user, (isDomainDeletedData) => {
                if (isDomainDeletedData[0] && isDomainDeletedData[0].is_deleted) {
                    domain.returnFromTrash(user, onSuccess, onError);
                }
                else {
                    onError(new Error('Домен уже существует'));
                }
            }, onError);
        }, onError);
    }
    static addNewDomain(data, user, onSuccess, onError) {
        App_1.default.getDBInstance().execute('add_new_domain', data, () => {
            onSuccess(new Domain(data.name));
        }, onError, user);
    }
    static isDomainExist(domain, user, onSuccess, onError) {
        App_1.default.getDBInstance().execute('get_full_info_about_domain', { domain }, (result) => {
            try {
                result[0].domain;
                onSuccess(true);
            }
            catch (e) {
                onSuccess(false);
            }
        }, onError, user);
    }
    static getFullInfoAboutAllDomains(user, onSuccess, onError) {
        App_1.default.getDBInstance().execute('get_full_info_about_all_domains', null, onSuccess, onError, user);
    }
    changeIsFavouriteField(isFavourite, user, onSuccess, onError) {
        App_1.default.getDBInstance().execute('change_domain_is_favourite_field', {
            isFavourite,
            domain: this.name
        }, onSuccess, onError, user);
    }
    remove(user, onSuccess, onError) {
        App_1.default.getDBInstance().execute('remove_domain', { domain: this.name }, onSuccess, onError, user);
    }
    getUrlsList(user, onSuccess, onError) {
        App_1.default.getDBInstance().execute('get_urls_list_by_domain', { name: this.name }, (urlsDataOnlyWithNameList) => {
            const namesList = getNamesListFromUrlsDataOnlyWithNameList_1.default(urlsDataOnlyWithNameList);
            onSuccess(namesList);
        }, onError, user);
    }
    getUrlsListWithPerformance(user, onSuccess, onError) {
        App_1.default.getDBInstance().execute('get_urls_list_with_performance', { domain: this.name }, onSuccess, onError, user);
    }
    getIsDeletedField(user, onSuccess, onError) {
        App_1.default.getDBInstance().execute('get_is_deleted_domain_field', { domain: this.name }, onSuccess, onError, user);
    }
    returnFromTrash(user, onSuccess, onError) {
        App_1.default.getDBInstance().execute('return_domain_from_trash', { domain: this.name }, onSuccess, onError, user);
    }
}
exports.default = Domain;
