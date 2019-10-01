import IFullUrlData from "../url/IFullUrlData";

interface IFullInfoAboutUrlsAndDomains {
    domain: string,
    added_by: string,
    favourite: boolean,
    urlsList: Array<IFullUrlData>
}

export default IFullInfoAboutUrlsAndDomains