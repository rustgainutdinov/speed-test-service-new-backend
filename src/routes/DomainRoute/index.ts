import IApplicationRoute from "../../interfaces/routes/IApplicationRoute";
import createDomainRoute from "./create";
import changeIsFavouriteFieldRoute from "./changeIsFavouriteField";
import removeDomainRoute from "./remove";
import getUrlsListByDomain from "./getUrlsListByDomain";

const DomainRoute: IApplicationRoute = {
    createRouter(router) {
        return router()
            .post('/create', createDomainRoute)
            .post('/change_is_favourite_field', changeIsFavouriteFieldRoute)
            .post('/remove', removeDomainRoute)
            .get('/get_urls_list', getUrlsListByDomain)
    }
};

export default DomainRoute