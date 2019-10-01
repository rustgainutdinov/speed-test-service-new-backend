import IApplicationRoute from "../../interfaces/routes/IApplicationRoute";
import getInfoAboutUrlAndDomainForAdminPanelRoute from "./getInfoAboutUrlAndDomainForAdminPanel";

const PagesRoute: IApplicationRoute = {
    createRouter(router) {
        return router()
            .get('/get_info_about_urls_and_domain_for_admin_panel', getInfoAboutUrlAndDomainForAdminPanelRoute)
    }
};

export default PagesRoute