import IFullUrlData from "../../interfaces/url/IFullUrlData";
import IFullDomainData from "../../interfaces/domain/IFullDomainData";
import groupDataByDomainName from "../domain/groupDataByDomainName";
import IGroupedByDomainNameData from "../../interfaces/domain/IGroupedByDomainNameData";
import IFullInfoAboutUrlsAndDomains from "../../interfaces/pages/IFullInfoAboutUrlsAndDomains";

function mergeFullInfoAboutUrlsAndDomains(urlsData: Array<IFullUrlData>, domainsData: Array<IFullDomainData>): Array<IFullInfoAboutUrlsAndDomains> {
    const groupedByDomainNameUrlsInfo: IGroupedByDomainNameData = groupDataByDomainName(urlsData);
    let fullInfoAboutUrlsAndDomains: Array<IFullInfoAboutUrlsAndDomains> = [];
    domainsData.forEach((fullDomainData: IFullDomainData) => {
        fullInfoAboutUrlsAndDomains.push(Object.assign(fullDomainData, {
            urlsList: groupedByDomainNameUrlsInfo[fullDomainData.domain]
        }));
    });
    return fullInfoAboutUrlsAndDomains;
}

export default mergeFullInfoAboutUrlsAndDomains