"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const App_1 = require("../App");
const getNamesListFromUrlsDataOnlyWithNameList_1 = require("../methods/url/getNamesListFromUrlsDataOnlyWithNameList");
class Domain {
    constructor(name) {
        this.name = name;
    }
    static create(data, user, onSuccess, onError) {
        App_1.default.getDBInstance().execute('add_new_domain', data, () => {
            onSuccess(new Domain(data.name));
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
}
exports.default = Domain;
