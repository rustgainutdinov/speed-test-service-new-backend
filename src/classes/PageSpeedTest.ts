import User from "./User";
import App from "../App";
import * as generateGUID from 'uuid/v4';

class PageSpeedTest {
    readonly idTest: string;

    static create(user: User, onSuccess: Function, onError: Function) {
        const idTest: string = generateGUID();
        App.getDBInstance().execute('add_new_test', {idTest}, ()=> {
            onSuccess(idTest)
        }, onError);
    }

    constructor(idTest: string) {
        this.idTest = idTest
    }
}

export default PageSpeedTest