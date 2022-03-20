import { getDB } from '../loaders/lowdb.js';

export const getDBUserByEmail = async (email) => {
	console.log(`Searching for user ${email}`);
	return await getDB().data.users.find((user) => user.email === email);
};

export const insertUserToDB = async (email, password) => {
	const user = { email, password };
	console.log(`Inserting new user ${JSON.stringify(user)}`);

	await getDB().data.users.push(user);
	await getDB().write();
	return user;
};