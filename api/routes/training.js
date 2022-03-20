import { Router } from 'express';
import { checkLoggedIn } from '../../middleware/auth.js';
import {
	validateCreateTrainingSession,
	validateUpdateTrainingSessionStatus,
	validateUpdateTrainingSessions,
} from '../../middleware/training.js';
import { getUserTrainingSessions, createNewUserTrainingSession, updateUserTrainingSessions, updateUserTrainingSession, deleteUserTrainingSession } from '../../services/training.js';
const route = Router();

export default (app) => {
	route.use(checkLoggedIn);
	app.use('/training', route);

	route.get('/', async (req, res) => {
		try {
			const userTrainingSessions = await getUserTrainingSessions(req.loggedInUser);
			return res.status(200).json(userTrainingSessions);
		} catch (error) {
			console.log(error);
			return res.sendStatus(500);
		}	
	});

	route.post('/', validateCreateTrainingSession, async (req, res) => {
		try {
			const userTrainingSessions = await createNewUserTrainingSession(req.loggedInUser, req.trainingSession);
			return res.status(200).json(userTrainingSessions);
		} catch (error) {
			console.log(error);
			return res.sendStatus(500);
		}
	});

	route.put('/', validateUpdateTrainingSessions, async (req, res) => {
		try {
			const userTrainingSessions = await updateUserTrainingSessions(req.loggedInUser, req.body.trainingPlan, req.body.bankSessions);
			return res.status(200).json(userTrainingSessions);
		} catch (error) {
			console.log(error);
			return res.sendStatus(500);
		}
	});

	route.put('/:trainingSessionId', validateUpdateTrainingSessionStatus, async (req, res) => {
		try {
			const updatedTrainingSession = await updateUserTrainingSession(req.loggedInUser, req.trainingSession);

			if (!updatedTrainingSession) {
				return res.status(404).send('not found training session id');
			}

			return res.status(200).json(updatedTrainingSession);
		} catch (error) {
			console.log(error);
			return res.sendStatus(500);
		}
	});

	route.delete('/:trainingSessionId', async (req, res) => {

		if (!req.params.trainingSessionId) {
			return res.status(400).send('request missing trainingSessionId query field');
		}

		try {
			const deletedTrainingSession = await deleteUserTrainingSession(req.loggedInUser, req.params.trainingSessionId);

			if (!deletedTrainingSession) {
				return res.status(404).send('not found training session id');
			}

			return res.status(200).json(deletedTrainingSession);
		} catch (error) {
			console.log(error);
			return res.sendStatus(500);
		}
	});
};