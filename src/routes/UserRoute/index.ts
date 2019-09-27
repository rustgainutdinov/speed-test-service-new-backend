import IApplicationRoute from "../../interfaces/routes/IApplicationRoute";
import createUserRoute from "./create";
import loginUserRoute from "./login";
import getUserDataByTokenRoute from "./getUserDataByToken";
import subscribeToDomainRoute from "./subscribeToDomain";
import unsubscribeToDomainRoute from "./unscribeToDomain";
import getUserSubscriptionsRoute from "./getUserSubscriptionsRoute";

const UserRoute: IApplicationRoute = {
    createRouter(router) {
        return router()
            .post('/create', createUserRoute)
            .get('/login', loginUserRoute)
            .get('/get_data_by_token', getUserDataByTokenRoute)
            .get('/subscribe_to_domain', subscribeToDomainRoute)
            .get('/unsubscribe_to_domain', unsubscribeToDomainRoute)
            .get('/get_user_subscriptions', getUserSubscriptionsRoute)
    }
};

export default UserRoute