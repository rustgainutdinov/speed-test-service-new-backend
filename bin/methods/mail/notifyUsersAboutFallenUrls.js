"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Url_1 = require("../../classes/Url");
const dateTimeFromat_1 = require("../../constants/dateTime/dateTimeFromat");
const App_1 = require("../../App");
const sendMail_1 = require("./sendMail");
const PageSpeedTest_1 = require("../../classes/PageSpeedTest");
const date = require('date-and-time');
function notifyUsersAboutFallenUrls(idTest, onError) {
    let fallenSpecifications = {};
    const pageSpeedTest = new PageSpeedTest_1.default(idTest);
    pageSpeedTest.getTestingUrlsByTestId((urlsList) => {
        urlsList.forEach((item) => {
            const startDate = date.format(new Date(Date.now() - 1000 * 60 * 60 * 24 * 30), dateTimeFromat_1.default);
            const endDate = date.format(new Date(), dateTimeFromat_1.default);
            new Url_1.default(item.name).getFallenIndicators(startDate, endDate, (result) => {
                fallenSpecifications[item.name] = result;
            }, onError);
        });
    }, onError);
    setTimeout(() => {
        let dataForEmailTemplates = {};
        App_1.default.getDBInstance().execute('get_users_subscriptions', null, (usersSubscriptions) => {
            usersSubscriptions.forEach((userSubscription) => {
                if (!dataForEmailTemplates[userSubscription.email]) {
                    dataForEmailTemplates[userSubscription.email] = {};
                }
                dataForEmailTemplates[userSubscription.email][userSubscription.url] = fallenSpecifications[userSubscription.url];
            });
            for (let key in dataForEmailTemplates) {
                sendMail_1.default([key], 'speed test', dataForEmailTemplates[key]);
            }
        }, onError);
    }, 10000);
}
exports.default = notifyUsersAboutFallenUrls;
