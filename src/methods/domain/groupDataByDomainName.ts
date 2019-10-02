import IDataWithDomainName from "../../interfaces/domain/IDataWithDomainName";
import IGroupedByDomainNameData from "../../interfaces/domain/IGroupedByDomainNameData";
import IFullUrlData from "../../interfaces/url/IFullUrlData";

function groupDataByDomainName(data: Array<IDataWithDomainName>): IGroupedByDomainNameData {
    let sortedData: IGroupedByDomainNameData = {};
    data.forEach((item: IDataWithDomainName) => {
        if (!sortedData[item.domain]) {
            sortedData[item.domain] = [];
        }
        sortedData[item.domain].push(<IFullUrlData>item);
    });
    return sortedData
}

export default groupDataByDomainName