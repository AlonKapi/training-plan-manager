import { Router } from 'express';
import { checkLoggedIn } from '../../middleware/auth.js';
const route = Router();

export default (app) => {
	route.use(checkLoggedIn);
	app.use('/training', route);

	route.get('/', (req, res) => {
		return res.status(200).json({ training: '1' });
	});

	route.post('/', (req, res) => {
		return res.sendStatus(200);
	});

	route.put('/:trainingSessionId', (req, res) => {
		return res.sendStatus(200);
	});

	route.delete('/:trainingSessionId', (req, res) => {
		return res.sendStatus(200);
	});
};