"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const App_1 = require("../App");
class Url {
    constructor(name) {
        this.name = name;
    }
    static create(data, user, onSuccess, onError) {
        App_1.default.getDBInstance().execute('add_new_url', data, () => {
            onSuccess(new Url(data.urlName));
        }, onError, user);
    }
    static getFullInfoAboutAllUrls(user, onSuccess, onError) {
        App_1.default.getDBInstance().execute('get_full_info_about_all_urls', null, onSuccess, onError, user);
    }
    static getAllUrls(user, onSuccess, onError) {
        App_1.default.getDBInstance().execute('get_all_urls', null, onSuccess, onError, user);
    }
    changeIsFavouriteField(isFavourite, user, onSuccess, onError) {
        App_1.default.getDBInstance().execute('change_url_is_favourite_field', {
            url: this.name,
            isFavourite
        }, onSuccess, onError, user);
    }
    remove(user, onSuccess, onError) {
        App_1.default.getDBInstance().execute('remove_url', {
            url: this.name,
        }, onSuccess, onError, user);
    }
}
exports.default = Url;
