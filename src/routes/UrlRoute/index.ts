import IApplicationRoute from "../../interfaces/routes/IApplicationRoute";
import createUrlRoute from "./create";
import changeIsFavouriteFieldRoute from "./changeIsFavouriteField";
import removeUrlRoute from "./remove";

const UrlRoute: IApplicationRoute = {
    createRouter(router) {
        return router()
            .post('/create', createUrlRoute)
            .post('/change_is_favourite_field', changeIsFavouriteFieldRoute)
            .post('/remove', removeUrlRoute)
    }
};

export default UrlRoute