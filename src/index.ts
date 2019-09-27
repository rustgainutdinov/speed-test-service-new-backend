import App from './App';
import APP_CONFIG from './config/appConfig'

try {
	const app = new App(APP_CONFIG);
	app.run();
} catch (e) {
	console.error(e.message);
}
