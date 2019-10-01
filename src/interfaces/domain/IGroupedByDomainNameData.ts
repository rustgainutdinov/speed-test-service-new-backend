import IFullUrlData from "../url/IFullUrlData";

interface IGroupedByDomainNameData {
    [domainName: string]: Array<IFullUrlData>
}

export default IGroupedByDomainNameData