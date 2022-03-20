import { getDB } from '../loaders/lowdb.js';

export const getDBUserByName = async (username) => {
	console.log(`Searching for user ${username}`);
	return await getDB().data.users.find((user) => user.username === username);
};

export const insertUserToDB = async (username, password) => {
    const user = {username, password};
    console.log(`Inserting new user ${JSON.stringify(user)}`);

    await getDB().data.users.push(user);
    await getDB().write();
    return user;
};