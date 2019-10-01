"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generateGUID = require("uuid/v4");
const cryptPass_1 = require("../methods/crypt/cryptPass");
const comparePass_1 = require("../methods/crypt/comparePass");
const App_1 = require("../App");
class User {
    constructor(token, email, pass) {
        this.token = token;
        this.email = email;
        this.pass = pass;
    }
    static create(data, onCreate, onError) {
        const userPass = data.pass;
        try {
            data.pass = cryptPass_1.default(data.pass);
        }
        catch (e) {
            onError(e);
        }
        App_1.default.getDBInstance().execute('create_user', data, () => {
            onCreate(new User(undefined, data.email, userPass));
        }, onError);
    }
    ;
    getPublicUserDataByToken(onSuccess, onError) {
        App_1.default.getDBInstance().execute('get_public_user_data_by_token', { token: this.token }, (listOfPublicUserData) => {
            try {
                onSuccess(listOfPublicUserData[0]);
            }
            catch (err) {
                onError(new Error('User is not found'));
            }
        }, onError);
    }
    ;
    login(onSuccess, onError) {
        this.getUserPassByEmail((passHash) => {
            let arePassAndHashEqual;
            try {
                arePassAndHashEqual = comparePass_1.default(this.pass, passHash);
            }
            catch (e) {
                onError(e);
            }
            if (!arePassAndHashEqual) {
                onError(new Error('User data is incorrect'));
            }
            this.token = generateGUID();
            App_1.default.getDBInstance().execute('set_token', {
                email: this.email,
                token: this.token
            }, () => {
                this.getRights((rights) => {
                    onSuccess({ token: this.token, rights });
                }, onError);
            }, onError);
        }, onError);
    }
    ;
    getUserPassByEmail(onSuccess, onError) {
        let email = this.email;
        App_1.default.getDBInstance().execute('get_user_pass_by_email', { email }, (listOfUserDataOnlyWithPass) => {
            try {
                onSuccess(listOfUserDataOnlyWithPass[0].pass);
            }
            catch (err) {
                onError(new Error('User is not found'));
            }
        }, onError, this);
    }
    getRights(onSuccess, onError) {
        App_1.default.getDBInstance().execute('get_rights_by_token', { token: this.token }, (listOfUserDataOnlyWithRights) => {
            try {
                onSuccess(listOfUserDataOnlyWithRights[0].rights);
            }
            catch (e) {
                onError(e);
            }
        }, onError);
    }
    subscribeToDomain(domain, onSuccess, onError) {
        App_1.default.getDBInstance().execute('user_subscribe_to_domain', { domain, token: this.token }, onSuccess, onError);
    }
    unsubscribeToDomain(domain, onSuccess, onError) {
        App_1.default.getDBInstance().execute('user_unsubscribe_to_domain', { domain, token: this.token }, onSuccess, onError);
    }
    getDomainsSubscriptions(onSuccess, onError) {
        App_1.default.getDBInstance().execute('get_user_domain_subscriptions', { token: this.token }, onSuccess, onError);
    }
}
exports.default = User;
