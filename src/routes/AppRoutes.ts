import {Express, Router} from 'express';

import IPathRoute from '../interfaces/routes/IPathRoute';
import UserRoute from './UserRoute';
import DomainRoute from "./DomainRoute";
import UrlRoute from "./UrlRoute";
import PagesRoute from "./PagesRoute";
import TestingServerRoute from "./TestingServerRoute";

export default class AppRoutes {
    private routeList: IPathRoute[] = [
        {path: '/user', router: UserRoute},
        {path: '/domain', router: DomainRoute},
        {path: '/url', router: UrlRoute},
        {path: '/pages', router: PagesRoute},
        {path: '/testing_server', router: TestingServerRoute},
    ];

    mount(expApp: Express): void {
        this.routeList.forEach((item) => {
            expApp.use(
                item.path,
                item.router.createRouter(Router)
            );
        });
    }
}
