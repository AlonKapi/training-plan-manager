import { Router } from 'express';
import { getUserByName, loginUser, registerUser } from '../../services/user.js';
const route = Router();

export default (app) => {
    app.use('/users', route);

    route.post('/register', async (req, res) => {
        const {username, password} = req.body;

        if (!username || !password) {
            return res.status(400).send('Missing credentials.');
        }

        try {
            if (await getUserByName(username)) {
                console.log(`User ${username} already registered.`);
                return res.status(401).send('User already exists with that name.');
            }

            console.log(`Registered user ${username}`);
            const createdUser = await registerUser(username, password);
            req.session.username = createdUser.username;
            return res.status(201).json({username: createdUser.username});
        } catch (error) {
            console.log(error);
            return res.sendStatus(500);
        }
    });

    route.post('/login', async (req, res) => {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).send('Missing credentials.');
        }

        try {
            if (!await loginUser(username, password)) {
                return res.status(401).send('Bad login credentials.');
            }

            console.log(`Logged in user ${username}`);
            req.session.username = username;
            return res.status(200).json({ username: username });
        } catch (error) {
            console.log(error);
            return res.sendStatus(500);
        }
    });

    route.get('/logout', (req, res) => {
        console.log(req.session);
        if (req.session.username) {
            console.log(`Logging out user ${req.session.username}`);
            req.session.destroy(() => {
                console.log('session destroyed');
            });
            return res.sendStatus(200);
        }
        
        return res.sendStatus(400);
    });
};