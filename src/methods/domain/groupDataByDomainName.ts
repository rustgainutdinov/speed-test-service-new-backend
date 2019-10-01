import IDataWithDomainName from "../../interfaces/domain/IDataWithDomainName";
import IGroupedByDomainNameData from "../../interfaces/domain/IGroupedByDomainNameData";

function groupDataByDomainName(data: Array<IDataWithDomainName>): IGroupedByDomainNameData {
    let sortedData: IGroupedByDomainNameData = {};
    data.forEach((item: IDataWithDomainName) => {
        if (!sortedData[item.domain]) {
            sortedData[item.domain] = [];
        }
        sortedData[item.domain].push(item);
    });
    return sortedData
}

export default groupDataByDomainName