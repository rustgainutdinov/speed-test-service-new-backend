"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const App_1 = require("../App");
const sortByDeviceByMode_1 = require("../methods/testDataSort/sortByDeviceByMode");
const getTheMostLowerIndicatorAtDay_1 = require("../methods/testDataSort/getTheMostLowerIndicatorAtDay");
const getMiddleIndicatorsForPeriod_1 = require("../methods/testDataSort/getMiddleIndicatorsForPeriod");
const matchIndicatorsOnFall_1 = require("../methods/testDataSort/matchIndicatorsOnFall");
class Url {
    constructor(name) {
        this.name = name;
    }
    static create(data, user, onSuccess, onError) {
        this.isUrlExist(data.urlName, user, (isUrlExist) => {
            if (!isUrlExist) {
                this.addNewUrl(data, user, onSuccess, onError);
                return;
            }
            const url = new Url(data.urlName);
            url.getIsDeletedField(user, (isPageDeletedData) => {
                if (isPageDeletedData[0] && isPageDeletedData[0].is_deleted) {
                    url.returnFromTrash(user, onSuccess, onError);
                }
                else {
                    onError(new Error('Страница уже существует'));
                }
            }, onError);
        }, onError);
    }
    static addNewUrl(data, user, onSuccess, onError) {
        App_1.default.getDBInstance().execute('add_new_url', data, () => {
            onSuccess(new Url(data.urlName));
        }, onError, user);
    }
    static isUrlExist(url, user, onSuccess, onError) {
        App_1.default.getDBInstance().execute('get_full_info_about_url', { url }, (result) => {
            console.log(result[0]);
            try {
                result[0].url;
                onSuccess(true);
            }
            catch (e) {
                onSuccess(false);
            }
        }, onError, user);
    }
    static getFullInfoAboutAllUrls(user, onSuccess, onError) {
        App_1.default.getDBInstance().execute('get_full_info_about_all_urls', null, onSuccess, onError, user);
    }
    static getAllUrls(onSuccess, onError) {
        App_1.default.getDBInstance().execute('get_all_urls', null, onSuccess, onError);
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
    getSelectedIndicatorsByDate(user, startDate, endDate, indicators, onSuccess, onError) {
        App_1.default.getDBInstance().execute('get_selected_indicators_by_url_and_date', {
            startDate,
            endDate,
            indicators,
            url: this.name
        }, (indicatorsDataList) => {
            const indicatorsDataWithTheMostLowerIndicatorAtDay = getTheMostLowerIndicatorAtDay_1.default(indicatorsDataList);
            const sortedByModeIndicatorsList = sortByDeviceByMode_1.default(indicatorsDataWithTheMostLowerIndicatorAtDay);
            onSuccess(sortedByModeIndicatorsList);
        }, onError, user);
    }
    getFallenIndicators(startDate, endDate, onSuccess, onError) {
        App_1.default.getDBInstance().execute('get_all_indicators_by_url_and_date', {
            url: this.name,
            startDate,
            endDate
        }, (allStandardIndicators) => {
            App_1.default.getDBInstance().execute('get_all_last_indicators_by_url', { url: this.name }, (allActualIndicators) => {
                const sortedByModeStandardIndicatorsList = sortByDeviceByMode_1.default(allStandardIndicators);
                const sortedByModeActualIndicatorsList = sortByDeviceByMode_1.default(allActualIndicators);
                const mobileMiddleIndicatorsByPeriod = getMiddleIndicatorsForPeriod_1.default(sortedByModeStandardIndicatorsList.mobile);
                const desktopMiddleIndicatorsByPeriod = getMiddleIndicatorsForPeriod_1.default(sortedByModeStandardIndicatorsList.desktop);
                const mobileChangedIndicators = matchIndicatorsOnFall_1.default(mobileMiddleIndicatorsByPeriod, sortedByModeActualIndicatorsList.mobile);
                const desktopChangedIndicators = matchIndicatorsOnFall_1.default(desktopMiddleIndicatorsByPeriod, sortedByModeActualIndicatorsList.desktop);
                onSuccess({
                    mobile: mobileChangedIndicators,
                    desktop: desktopChangedIndicators,
                });
            }, onError);
        }, onError);
    }
    getIsDeletedField(user, onSuccess, onError) {
        App_1.default.getDBInstance().execute('get_is_deleted_url_field', { url: this.name }, onSuccess, onError, user);
    }
    returnFromTrash(user, onSuccess, onError) {
        App_1.default.getDBInstance().execute('return_url_from_trash', { url: this.name }, onSuccess, onError, user);
    }
}
exports.default = Url;
