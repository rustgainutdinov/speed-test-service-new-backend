import * as express from 'express';
import * as bodyParser from 'body-parser';
import {Express, NextFunction, Request, Response} from 'express';
import IApplicationConfig from './interfaces/app/IApplicationConfig'
import AppRoutes from './routes/AppRoutes';
import IDataBaseProvider from "./interfaces/db/IDataBaseProvider";
import DataBaseProvider from "./data_provider/DataBaseProvider";
import errorHandler from "./methods/app/errorHangler";
import setResponseSettings from "./methods/app/setResponseSettings";

export default class App {
    private static app: App;
    private readonly expApp: Express;
    readonly dataBaseProvider: IDataBaseProvider;

    public static getDBInstance(): IDataBaseProvider {
        return DataBaseProvider.getDBInstance();
    }

    constructor(private config: IApplicationConfig) {
        if (App.app instanceof App) {
            throw new Error('Нельзя создать более одного экземпляра приложения');
        }
        this.config = config;
        this.dataBaseProvider = new DataBaseProvider(this.config.db);
        this.expApp = express();
        App.app = this;
    }

    run(): void {
        this.expApp.use(bodyParser.urlencoded({
            extended: false
        }));
        this.expApp.use(bodyParser.json());
        this.expApp.use(setResponseSettings);
        this.expApp.use(errorHandler);
        let appRouter = new AppRoutes();
        appRouter.mount(this.expApp);
        this.expApp.listen(this.config.listenPort, (err) => {
            if (err !== undefined) {
                console.log(err);
            } else {
                console.log("Server run on port: " + this.config.listenPort);
            }
        });
    }
}
