import IUrlsDataOnlyWithNameList from "../../interfaces/url/IUrlsDataOnlyWithNameList";

function getNamesListFromUrlsDataOnlyWithNameList(urlsData: IUrlsDataOnlyWithNameList): Array<string> {
    let namesList: Array<string> = [];
    urlsData.forEach(item => {
        namesList.push(item.name);
    });
    return namesList
}

export default getNamesListFromUrlsDataOnlyWithNameList