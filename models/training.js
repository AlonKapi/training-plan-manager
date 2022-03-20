import { getDB } from '../loaders/lowdb.js';

export const getDBUserTrainingSessions = async (email) => {
    if (!email) {
        throw new Error('Not received email');
    }

    return await getDB().data.users_training_sessions.find((sessions) => sessions.email === email);
};

export const insertDBUserTrainingSessions = async (email, bankSessions, trainingPlan = []) => {
	if (!email) {
		throw new Error('Not received email');
	}

	console.log(`Inserting bank training sessions ${bankSessions} and training plan ${trainingPlan} for user ${email}`);

	const userTrainingSessions = { email, bankSessions, trainingPlan };
	await getDB().data.users_training_sessions.push(userTrainingSessions);
	await getDB().write();

	return userTrainingSessions;
};

export const updateDBUserTrainingSessions = async(updatedTrainingSessions) => {

    if (!updatedTrainingSessions || !updatedTrainingSessions.email) {
		throw new Error(`Bad object to update = ${updatedTrainingSessions}`);
	}

    await getDB().data.users_training_sessions.map(sessions => sessions.email !== updatedTrainingSessions.email ? sessions : updatedTrainingSessions);
    await getDB().write();

    return updatedTrainingSessions;
};