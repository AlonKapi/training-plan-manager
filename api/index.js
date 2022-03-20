import { Router } from 'express';
import user from './routes/user.js';
import training from './routes/training.js';

export default () => {
    const app = Router();
    user(app);
    training(app);

    return app;
};