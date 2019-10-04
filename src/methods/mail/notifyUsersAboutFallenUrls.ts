import Url from "../../classes/Url";
import IUrlDataOnlyWithNameList from "../../interfaces/url/IUrlsDataOnlyWithNameList";
import IUrlDataOnlyWithName from "../../interfaces/url/IUrlDataOnlyWithName";
import DATE_TIME_FORMAT from "../../constants/dateTime/dateTimeFromat";
import IUrlsChangedIndicatorsMap from "../../interfaces/testData/IUrlsChangedIndicatorsMap";
import App from "../../App";
import IDataForUsersEmails from "../../interfaces/testData/IDataForUsersEmails";
import IUserSubscription from "../../interfaces/user/IUserSubscription";
import sendMail from "./sendMail";
import PageSpeedTest from "../../classes/PageSpeedTest";

const date = require('date-and-time');

function notifyUsersAboutFallenUrls(idTest: string, onError: Function) {
    let fallenSpecifications: IUrlsChangedIndicatorsMap = {};
    const pageSpeedTest: PageSpeedTest = new PageSpeedTest(idTest);
    pageSpeedTest.getTestingUrlsByTestId((urlsList: IUrlDataOnlyWithNameList) => {
        urlsList.forEach((item: IUrlDataOnlyWithName) => {
            const startDate: string = date.format(new Date(Date.now() - 1000 * 60 * 60 * 24 * 30), DATE_TIME_FORMAT);
            const endDate: string = date.format(new Date(), DATE_TIME_FORMAT);
            new Url(item.name).getFallenIndicators(startDate, endDate, (result: any) => {
                fallenSpecifications[item.name] = result
            }, onError);
        });
    }, onError);
    setTimeout(() => {
        let dataForEmailTemplates: IDataForUsersEmails = {};
        App.getDBInstance().execute('get_users_subscriptions', null, (usersSubscriptions: Array<IUserSubscription>) => {
            usersSubscriptions.forEach((userSubscription: any) => {
                if (!dataForEmailTemplates[userSubscription.email]) {
                    dataForEmailTemplates[userSubscription.email] = {}
                }
                dataForEmailTemplates[userSubscription.email][userSubscription.url] = fallenSpecifications[userSubscription.url];
            });
            for (let key in dataForEmailTemplates) {
                sendMail([key], 'speed test', dataForEmailTemplates[key]);
            }
        }, onError);
    }, 10000)
}

export default notifyUsersAboutFallenUrls