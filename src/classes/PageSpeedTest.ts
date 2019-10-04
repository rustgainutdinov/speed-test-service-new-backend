import User from "./User";
import App from "../App";
import * as generateGUID from 'uuid/v4';
import IUrlDataOnlyWithNameList from "../interfaces/url/IUrlsDataOnlyWithNameList";

class PageSpeedTest {
    readonly idTest: string;

    static create(user: User, onSuccess: Function, onError: Function) {
        const idTest: string = generateGUID();
        App.getDBInstance().execute('add_new_test', {idTest}, () => {
            onSuccess(idTest)
        }, onError);
    }

    constructor(idTest: string) {
        this.idTest = idTest
    }

    getTestingUrlsByTestId(onSuccess: Function, onError: Function) {
        App.getDBInstance().execute('get_urls_name_by_test_id', {idTest: this.idTest}, onSuccess, onError);
    }
}

export default PageSpeedTest