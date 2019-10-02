import IApplicationConfig from "../interfaces/app/IApplicationConfig";

const APP_CONFIG: IApplicationConfig = {
	listenPort: 8001,
	appName: 'Example Application',
	db: {
		user: process.env.NODE_ENV === 'production' ? 'postgres' : 'postgres',//postgres
		host: 'localhost',
		database: process.env.NODE_ENV === 'production' ? 'speed-test-service' : 'speed-test-service',//page-uppers
		password: process.env.NODE_ENV === 'production' ? 'Ehwuidzn0672' : '!QA2ws#ED',//gv9y3ytsow
		port: 5432
	}
};

export default APP_CONFIG
