import { configureApp } from './config/express';

configureApp().then(app => {
	app.listen(process.env.PORT, () => console.log(`[Server]: ⚡️ Running on port ${process.env.PORT}`));
});
