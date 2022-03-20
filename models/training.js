import { getDB } from '../loaders/lowdb.js';

export const getDBUserTrainingSessions = async (username) => {

    if (!username) {
        throw new Error('Not received username');
    }

    return await getDB().data.users_training_sessions.find(sessions => sessions.username === username);
};

export const insertDBUserTrainingSessions = async (username, bankSessions, trainingPlan=[]) => {

    if (!username) {
		throw new Error('Not received username');
	}

    console.log(`Inserting bank training sessions ${bankSessions} and training plan ${trainingPlan} for user ${username}`);

    const userTrainingSessions = { username, bankSessions, trainingPlan};
    await getDB().data.users_training_sessions.push(userTrainingSessions);
	await getDB().write();

    return userTrainingSessions;
};

export const updateDBUserTrainingSessions = async(updatedTrainingSessions) => {

    if (!updatedTrainingSessions || !updatedTrainingSessions.username) {
		throw new Error(`Bad object to update = ${updatedTrainingSessions}`);
	}

    await getDB().data.users_training_sessions.map(sessions => sessions.username !== updatedTrainingSessions.username ? sessions : updatedTrainingSessions);
    await getDB().write();

    return updatedTrainingSessions;
};