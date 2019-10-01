import IApplicationRoute from "../../interfaces/routes/IApplicationRoute";
import getTokenByAppKey from "./getTokenByAppKey";
import saveTestingData from "./saveTestingData";
import testAllUrls from "./testAllUrls";
import testUrlsList from "./testUrlsList";

const TestingServerRoute: IApplicationRoute = {
    createRouter(router) {
        return router()
            .get('/get_token_by_app_key', getTokenByAppKey)
            .post('/save_testing_data', saveTestingData)
            .post('/test_all_urls', testAllUrls)
            .post('/test_urls_list', testUrlsList)
    }
};

export default TestingServerRoute