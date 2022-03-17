import 'dotenv/config';
import loaders from './loaders/index.js';
import express from 'express';

async function startServer() {
	const port = process.env.PORT || 3000;

	const app = express();

	await loaders({ expressApp: app });

	app.listen(port, (err) => {
		if (err) {
			console.log(err);
			return;
		}
		console.log(`Server is listening on port ${port}`);
	});
}

startServer();
