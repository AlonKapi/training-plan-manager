import { randomUUID } from 'crypto';
import {getDBUserTrainingSessions, insertDBUserTrainingSessions, updateDBUserTrainingSessions} from '../models/training.js';

export const getUserTrainingSessions = async (email) => {
	let userTrainingSessions = await getDBUserTrainingSessions(email);

	if (!userTrainingSessions) {
		userTrainingSessions = await insertDBUserTrainingSessions(email, getDefaultTrainingSessions());
	}

	console.log(`Got results ${JSON.stringify(userTrainingSessions)}`);
	return userTrainingSessions;
};

export const createNewUserTrainingSession = async (email, trainingSession) => {
	let userTrainingSessions = await getDBUserTrainingSessions(email);

	if (!userTrainingSessions) {
		throw new Error(`No training sessions found for user ${email}`);
	}

	console.log(`Inserting training session ${JSON.stringify(trainingSession)} for user ${email}`);

	trainingSession.id = randomUUID();
	trainingSession.isCompleted = false;
	userTrainingSessions.bankSessions.push(trainingSession);
	await updateDBUserTrainingSessions(userTrainingSessions);
	return trainingSession;
};

export const updateUserTrainingSessions = async (email, trainingPlan, bankSessions) => {
	let userTrainingSessions = await getDBUserTrainingSessions(email);

	if (!userTrainingSessions) {
		throw new Error(`No training sessions found for user ${email}`);
	}

	userTrainingSessions.trainingPlan = trainingPlan || [];
	userTrainingSessions.bankSessions = bankSessions || [];
	return await updateDBUserTrainingSessions(userTrainingSessions);
};

export const updateUserTrainingSession = async (email, requestTrainingSession) => {
	let userTrainingSessions = await getDBUserTrainingSessions(email);

	if (!userTrainingSessions) {
		throw new Error(`No training sessions found for user ${email}`);
	}

	console.log(`Updating training session ${JSON.stringify(requestTrainingSession)} for user ${email}`);
	let updatedTrainingSession;

	const updatedPlanSessions = userTrainingSessions.trainingPlan.map((trainingSession) => {
		if (trainingSession.id === requestTrainingSession.id) {
			trainingSession.isCompleted = requestTrainingSession.isCompleted;
			updatedTrainingSession = trainingSession;
		}

		return trainingSession;
	});

	if (updatedTrainingSession) {
		userTrainingSessions.trainingPlan = updatedPlanSessions;
		userTrainingSessions = await updateDBUserTrainingSessions(userTrainingSessions);
	}

	return updatedTrainingSession;
};

export const deleteUserTrainingSession = async (email, trainingSessionId) => {
	let userTrainingSessions = await getDBUserTrainingSessions(email);

	if (!userTrainingSessions) {
		throw new Error(`No training sessions found for user ${email}`);
	}

	console.log(`Deleting training session ${JSON.stringify(trainingSessionId)} for user ${email}`);
	let deletedTrainingSession;

	const updatedBankSessions = userTrainingSessions.bankSessions.filter((trainingSession) => {
		if (trainingSession.id !== trainingSessionId) {
			return true;
		}

		deletedTrainingSession = trainingSession;
		return false;
	});

	if (deletedTrainingSession) {
		console.log(updatedBankSessions);
		userTrainingSessions.bankSessions = updatedBankSessions;
		await updateDBUserTrainingSessions(userTrainingSessions);
	}

	return deletedTrainingSession;
};

const getDefaultTrainingSessions = () => {
	return [
		{
			id: randomUUID(),
			title: 'Example Title 1',
			description: 'Example Description 1',
			isCompleted: false,
		},
		{
			id: randomUUID(),
			title: 'Example Title 2',
			description: 'Example Description 2',
			isCompleted: false,
		},
		{
			id: randomUUID(),
			title: 'Example Title 3',
			description: 'Example Description 3',
			isCompleted: false,
		},
		{
			id: randomUUID(),
			title: 'Example Title 4',
			description: 'Example Description 4',
			isCompleted: false,
		},
		{
			id: randomUUID(),
			title: 'Example Title 5',
			description: 'Example Description 5',
			isCompleted: false,
		},
	];
};