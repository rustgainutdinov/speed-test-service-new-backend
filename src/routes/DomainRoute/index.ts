import IApplicationRoute from "../../interfaces/routes/IApplicationRoute";
import createDomainRoute from "./create";
import changeIsFavouriteFieldRoute from "./changeIsFavouriteField";
import removeDomainRoute from "./remove";
import getUrlsListByDomain from "./getUrlsListByDomain";
import getUrlsLIstWithPerformanceRoute from "./getUrlsLIstWithPerformance";
import getFullInfoAboutAllDomainsRoute from "./getFullInfoAboutAllDomains";
import changeDomainPriorityRoute from "./changeDisplayPriority";

const DomainRoute: IApplicationRoute = {
    createRouter(router) {
        return router()
            .post('/create', createDomainRoute)
            .post('/change_is_favourite_field', changeIsFavouriteFieldRoute)
            .post('/remove', removeDomainRoute)
            .get('/get_urls_list', getUrlsListByDomain)
            .get('/get_urls_list_with_performance', getUrlsLIstWithPerformanceRoute)
            .get('/get_full_info_about_all_domains', getFullInfoAboutAllDomainsRoute)
            .post('/change_domain_priority', changeDomainPriorityRoute)
    }
};

export default DomainRoute