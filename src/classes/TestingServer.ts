import App from "../App";
import ITestingServerInfo from "../interfaces/testingServer/ITestingServerInfo";
import comparePass from "../methods/crypt/comparePass";
import * as generateGUID from 'uuid/v4';
import IReceivedTestingData from "../interfaces/testingServer/IReceivedTestingData";
import ITestingDataToSave from "../interfaces/testingServer/ITestingDataToSave";
import prepareTestingDataToSave from "../methods/testingServer/prepareTestingDataToSave";
import IUrlsDataOnlyWithNameList from "../interfaces/url/IUrlsDataOnlyWithNameList";
import IUrlNameAndModeList from "../interfaces/url/IUrlNameAndModeList";
import IUrlDataOnlyWithName from "../interfaces/url/IUrlDataOnlyWithName";
import User from "./User";
import PageSpeedTest from "./PageSpeedTest";
import axios from 'axios';

class TestingServer {
    private readonly ip: string;
    private token?: string;

    static testUrlsList(user: User, urlsList: IUrlsDataOnlyWithNameList, onSuccess: Function, onError: Function) {
        let urlNameAndModeList: IUrlNameAndModeList = [];
        urlsList.forEach((urlData: IUrlDataOnlyWithName) => {
            urlNameAndModeList.push({name: urlData.name, mode: 'mobile'});
            urlNameAndModeList.push({name: urlData.name, mode: 'desktop'});
        });
        PageSpeedTest.create(user, (idTest: string) => {
            axios.post('http://localhost:3080/test/list_of_urls', null, {
                params: {
                    list_of_urls: JSON.stringify(urlNameAndModeList),
                    id_test: idTest
                }
            }).then((result: any) => {
                onSuccess(result.data);
            }).catch((e: Error) => {
                console.log('req error');
                onError(e);
            });
        }, onError);
    }

    constructor(ip: string, token?: string) {
        this.ip = ip;
        this.token = token;
    }

    getToken(appKey: string, onSuccess: Function, onError: Function) {
        this.getInfo((testingServerInfo: ITestingServerInfo) => {
            let areKeysEqual: boolean;
            try {
                areKeysEqual = comparePass(appKey, testingServerInfo.key_hash)
            } catch (e) {
                onError(e);
                return
            }
            if (areKeysEqual) {
                const token: string = generateGUID();
                App.getDBInstance().execute('set_speed_test_service_token',
                    {ip: this.ip, token},
                    () => {
                        onSuccess(token);
                    }, onError)
            } else {
                onError(new Error('Key does not fit'));
            }
        }, onError);
    }

    private getInfo(onSuccess: Function, onError: Function) {
        App.getDBInstance().execute('get_speed_test_service_info_by_ip', {ip: this.ip}, (result: Array<ITestingServerInfo>) => {
            try {
                onSuccess(result[0])
            } catch (e) {
                onError(new Error('Service is not found'));
            }
        }, onError);
    }

    saveTestingData(data: Array<IReceivedTestingData>, token: string, idTest: string, onSuccess: Function, onError: Function) {
        const testingDataToSave: Array<ITestingDataToSave> = prepareTestingDataToSave(data, token, idTest);
        App.getDBInstance().execute('save_testing_data', {data: testingDataToSave}, onSuccess, onError);
    }
}

export default TestingServer