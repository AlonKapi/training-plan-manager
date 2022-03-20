import expressLoader from './express.js';
import { initializeDB } from './lowdb.js';

export default async ({ expressApp }) => {
    await initializeDB();
    console.log('LowDB Initialized');

    await expressLoader({ app: expressApp });
	console.log('Express Initialized');
};