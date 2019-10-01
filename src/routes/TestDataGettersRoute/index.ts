import IApplicationRoute from "../../interfaces/routes/IApplicationRoute";
import getPerformanceDataForLastWeekRoute from "./getPerformanceDataForLastWeek";
import getPerformanceDataByUrlAndDateRoute from "./getPerformanceDataByUrlAndDate";

const TestDataGettersRoute: IApplicationRoute = {
    createRouter(router) {
        return router()
            .get('/get_performance_data_for_last_week', getPerformanceDataForLastWeekRoute)
            .get('/get_performance_data_by_url_and_date', getPerformanceDataByUrlAndDateRoute)
    }
};

export default TestDataGettersRoute