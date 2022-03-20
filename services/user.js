import { getDBUserByEmail, insertUserToDB } from '../models/user.js';
import bcrypt from 'bcrypt';

export const getUserByEmail = async (email) => {
	return await getDBUserByEmail(email);
};

export const registerUser = async (email, password) => {
	const hashedPassword = await bcrypt.hash(password, 10);
	return await insertUserToDB(email, hashedPassword);
};

export const loginUser = async (email, password) => {

	const existingUser = await getUserByEmail(email);

	if (!existingUser) {
		console.log(`User ${email} not registered.`);
		return false;
	}

	return await bcrypt.compare(password, existingUser.password);
};