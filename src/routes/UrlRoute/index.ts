import IApplicationRoute from "../../interfaces/routes/IApplicationRoute";
import createUrlRoute from "./create";
import changeIsFavouriteFieldRoute from "./changeIsFavouriteField";
import removeUrlRoute from "./remove";
import getSelectedIndicatorsByDateRoute from "./getSelectedIndicatorsByDate";
import getFallenIndicatorsRoute from "./getFallenIndicators";

const UrlRoute: IApplicationRoute = {
    createRouter(router) {
        return router()
            .post('/create', createUrlRoute)
            .post('/change_is_favourite_field', changeIsFavouriteFieldRoute)
            .post('/remove', removeUrlRoute)
            .get('/get_selected_indicators_by_date', getSelectedIndicatorsByDateRoute)
            .get('/get_fallen_indicators', getFallenIndicatorsRoute)
    }
};

export default UrlRoute