import * as generateGUID from 'uuid/v4';
import cryptPass from "../methods/crypt/cryptPass";
import comparePass from "../methods/crypt/comparePass";
import IQueryData from '../interfaces/db/IQueryData'
import App from "../App";
import IPublicUserData from "../interfaces/user/IPublicUserData";
import IUserDataOnlyWithPass from "../interfaces/user/IUserDataOnlyWithPass";
import IUserDataOnlyWithRights from "../interfaces/user/IUserDataOnlyWithRights";

class User {
    private token?: string;
    private readonly email?: string;
    private readonly pass?: string;

    static create(data: IQueryData, onCreate: Function, onError: Function): void {
        const userPass = data.pass;
        try {
            data.pass = cryptPass(data.pass);
        } catch (e) {
            onError(e)
        }
        App.getDBInstance().execute('create_user', data, () => {
            onCreate(new User(undefined, data.email, userPass));
        }, (err: Error) => {
            onError(new Error('Этот email уже занят'));
        });
    };

    constructor(token?: string, email?: string, pass?: string) {
        this.token = token;
        this.email = email;
        this.pass = pass;
    }

    getPublicUserDataByToken(onSuccess: Function, onError: Function) {
        App.getDBInstance().execute('get_public_user_data_by_token', {token: this.token},
            (listOfPublicUserData: Array<IPublicUserData>): void => {
                try {
                    onSuccess(listOfPublicUserData[0]);
                } catch (err) {
                    onError(new Error('Неверный логин или пароль'));
                }
            }, onError);
    };

    login(onSuccess: Function, onError: Function) {
        this.getUserPassByEmail((passHash: string) => {
            let arePassAndHashEqual: boolean;
            try {
                arePassAndHashEqual = comparePass(this.pass, passHash);
            } catch (e) {
                onError(e)
            }
            if (!arePassAndHashEqual) {
                onError(new Error('Неверный логин или пароль'))
            }
            this.token = generateGUID();
            App.getDBInstance().execute('set_token',
                {
                    email: this.email,
                    token: this.token
                },
                () => {
                    this.getRights((rights: number) => {
                        onSuccess({token: this.token, rights});
                    }, onError);
                }, onError);
        }, onError);
    };

    private getUserPassByEmail(onSuccess: Function, onError: Function) {
        let email = this.email;
        App.getDBInstance().execute('get_user_pass_by_email', {email}, (listOfUserDataOnlyWithPass: Array<IUserDataOnlyWithPass>) => {
            try {
                onSuccess(listOfUserDataOnlyWithPass[0].pass);
            } catch (err) {
                onError(new Error('User is not found'));
            }
        }, onError, this);
    }

    getRights(onSuccess: Function, onError: Function) {
        App.getDBInstance().execute('get_rights_by_token', {token: this.token}, (listOfUserDataOnlyWithRights: Array<IUserDataOnlyWithRights>) => {
            try {
                onSuccess(listOfUserDataOnlyWithRights[0].rights)
            } catch (e) {
                onError(e)
            }
        }, onError);
    }

    subscribeToDomain(domain: string, onSuccess: Function, onError: Function) {
        App.getDBInstance().execute('user_subscribe_to_domain', {domain, token: this.token}, onSuccess, onError);
    }

    unsubscribeToDomain(domain: string, onSuccess: Function, onError: Function) {
        App.getDBInstance().execute('user_unsubscribe_to_domain', {domain, token: this.token}, onSuccess, onError);
    }

    getDomainsSubscriptions(onSuccess: Function, onError: Function) {
        App.getDBInstance().execute('get_user_domain_subscriptions', {token: this.token}, onSuccess, onError);
    }
}

export default User