import IQueryData from "../interfaces/db/IQueryData";
import App from "../App";
import User from "./User";
import ITestData from "../interfaces/testData/ITestData";
import sortTestDataByMode from "../methods/testDataSort/sortByDeviceByMode";
import getTheMostLowerIndicatorAtDay from "../methods/testDataSort/getTheMostLowerIndicatorAtDay";
import ISortedByModeTestData from "../interfaces/testData/ISortedByModeTestData";
import IChangedIndicator from "../methods/testDataSort/IChangedIndicator";
import IIndicatorsValueMap from "../interfaces/testData/IIndicatorsValueMap";
import getMiddleIndicatorsForPeriod from "../methods/testDataSort/getMiddleIndicatorsForPeriod";
import matchIndicatorsOnFall from "../methods/testDataSort/matchIndicatorsOnFall";

class Url {
    readonly name: string;

    static create(data: IQueryData, user: User, onSuccess: Function, onError: Function) {
        App.getDBInstance().execute('add_new_url', data, () => {
            onSuccess(new Url(data.urlName))
        }, onError, user);
    }

    static getFullInfoAboutAllUrls(user: User, onSuccess: Function, onError: Function) {
        App.getDBInstance().execute('get_full_info_about_all_urls', null, onSuccess, onError, user);
    }

    static getAllUrls(user: User, onSuccess: Function, onError: Function) {
        App.getDBInstance().execute('get_all_urls', null, onSuccess, onError, user);
    }

    constructor(name: string) {
        this.name = name
    }

    changeIsFavouriteField(isFavourite: boolean, user: User, onSuccess: Function, onError: Function) {
        App.getDBInstance().execute('change_url_is_favourite_field', {
            url: this.name,
            isFavourite
        }, onSuccess, onError, user);
    }

    remove(user: User, onSuccess: Function, onError: Function) {
        App.getDBInstance().execute('remove_url', {
            url: this.name,
        }, onSuccess, onError, user);
    }

    getSelectedIndicatorsByDate(user: User, startDate: string, endDate: string, indicators: Array<string>, onSuccess: Function, onError: Function) {
        App.getDBInstance().execute('get_selected_indicators_by_url_and_date', {
            startDate,
            endDate,
            indicators,
            url: this.name
        }, (indicatorsDataList: Array<ITestData>) => {
            const indicatorsDataWithTheMostLowerIndicatorAtDay: Array<ITestData> = getTheMostLowerIndicatorAtDay(indicatorsDataList);
            const sortedByModeIndicatorsList: ISortedByModeTestData = sortTestDataByMode(indicatorsDataWithTheMostLowerIndicatorAtDay);
            onSuccess(sortedByModeIndicatorsList);
        }, onError, user);
    }

    getFallenIndicators(startDate: string, endDate: string, onSuccess: Function, onError: Function) {
        App.getDBInstance().execute('get_all_indicators_by_url_and_date', {
            url: this.name,
            startDate,
            endDate
        }, (allStandardIndicators: Array<ITestData>) => {
            App.getDBInstance().execute('get_all_last_indicators_by_url', {url: this.name}, (allActualIndicators: Array<ITestData>) => {
                const sortedByModeStandardIndicatorsList: ISortedByModeTestData = sortTestDataByMode(allStandardIndicators);
                const sortedByModeActualIndicatorsList: ISortedByModeTestData = sortTestDataByMode(allActualIndicators);
                const mobileMiddleIndicatorsByPeriod: IIndicatorsValueMap = getMiddleIndicatorsForPeriod(sortedByModeStandardIndicatorsList.mobile);
                const desktopMiddleIndicatorsByPeriod: IIndicatorsValueMap = getMiddleIndicatorsForPeriod(sortedByModeStandardIndicatorsList.desktop);
                const mobileChangedIndicators: Array<IChangedIndicator> = matchIndicatorsOnFall(mobileMiddleIndicatorsByPeriod, sortedByModeActualIndicatorsList.mobile);
                const desktopChangedIndicators: Array<IChangedIndicator> = matchIndicatorsOnFall(desktopMiddleIndicatorsByPeriod, sortedByModeActualIndicatorsList.desktop);
                onSuccess({
                    mobile: mobileChangedIndicators,
                    desktop: desktopChangedIndicators,
                });
            }, onError);
        }, onError);
    }
}

export default Url