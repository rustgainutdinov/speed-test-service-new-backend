import IDataBaseConfig from '../db/IDataBaseConfig'

interface IApplicationConfig {
	listenPort: number,
	appName: string,
	db: IDataBaseConfig
}

export default IApplicationConfig;
