import { join, dirname } from 'path';
import { Low, JSONFile } from 'lowdb';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dbFileName = 'db.json';

// Use JSON file for storage
const file = join(__dirname, dbFileName);
const adapter = new JSONFile(file);
const db = new Low(adapter);

export const initializeDB = async () => {
	// Read data from JSON file, this will set db.data content
	await db.read();

	// Initialize json db
	if (!db.data) {
		db.data = { users: [], users_training_sessions: [] };
		await db.write();
	}
};

export const getDB = () => {
	return db;
};