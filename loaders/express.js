import express from 'express';
import sessions from 'express-session';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const oneDay = 1000 * 60 * 60 * 24;

export default async ({app}) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors());
    app.use(cookieParser());
    app.use(
		sessions({
			secret: process.env.SESSION_SECRET || 'devsessionsecret',
			saveUninitialized: true,
			cookie: { maxAge: oneDay },
			resave: false,
		})
	);

    // Return the express app
    return app;
};