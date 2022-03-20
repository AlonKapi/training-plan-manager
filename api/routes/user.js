import { Router } from 'express';
import { getUserByEmail, loginUser, registerUser } from '../../services/user.js';
const route = Router();

export default (app) => {
    app.use('/users', route);

    route.post('/register', async (req, res) => {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send('Missing credentials.');
        }

        try {
            if (await getUserByEmail(email)) {
                console.log(`User ${email} already registered.`);
                return res.status(401).send('User already exists with that name.');
            }

            console.log(`Registered user ${email}`);
            const createdUser = await registerUser(email, password);
            req.session.email = createdUser.email;
            return res.status(201).json({ email: createdUser.email });
        } catch (error) {
            console.log(error);
            return res.sendStatus(500);
        }
    });

    route.post('/login', async (req, res) => {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send('Missing credentials.');
        }

        try {
            if (!await loginUser(email, password)) {
                return res.status(401).send('Bad login credentials.');
            }

            console.log(`Logged in user ${email}`);
            req.session.email = email;
            return res.status(200).json({ email: email });
        } catch (error) {
            console.log(error);
            return res.sendStatus(500);
        }
    });

    route.get('/logout', (req, res) => {
        console.log(req.session);
        if (req.session.email) {
            console.log(`Logging out user ${req.session.email}`);
            req.session.destroy(() => {
                console.log('session destroyed');
            });
            return res.sendStatus(200);
        }
        
        return res.sendStatus(400);
    });
};