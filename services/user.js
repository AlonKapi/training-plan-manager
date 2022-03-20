import { getDBUserByName, insertUserToDB } from '../models/user.js';
import bcrypt from 'bcrypt';

export const getUserByName = async (username) => {
    return await getDBUserByName(username);
};

export const registerUser = async (username, password) => {
	const hashedPassword = await bcrypt.hash(password, 10);
	return await insertUserToDB(username, hashedPassword);
};

export const loginUser = async (username, password) => {

    const existingUser = await getUserByName(username);

    if (!existingUser) {
		console.log(`User ${username} not registered.`);
		return false;
	}
    
    return await bcrypt.compare(password, existingUser.password);
};