import Url from "../../classes/Url";
import Domain from "../../classes/Domain";
import User from "../../classes/User";
import IFullUrlData from "../../interfaces/url/IFullUrlData";
import IFullDomainData from "../../interfaces/domain/IFullDomainData";
import mergeFullInfoAboutUrlsAndDomains from "./mergeFullInfoAboutUrlsAndDomains";

function getInfoAboutUrlAndDomainForAdminPanel(user: User, onSuccess: Function, onError: Function) {
    Url.getFullInfoAboutAllUrls(user, (urlsData: Array<IFullUrlData>) => {
        Domain.getFullInfoAboutAllDomains(user, (domainsData: Array<IFullDomainData>) => {
            onSuccess(mergeFullInfoAboutUrlsAndDomains(urlsData, domainsData))
        }, onError)
    }, onError);
}

export default getInfoAboutUrlAndDomainForAdminPanel