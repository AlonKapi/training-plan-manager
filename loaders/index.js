import expressLoader from './express.js';
import lowdbLoader from './lowdb.js';

export default async ({ expressApp }) => {
    await lowdbLoader();
    console.log('LowDB Initialized');

    await expressLoader({ app: expressApp });
	console.log('Express Initialized');
};