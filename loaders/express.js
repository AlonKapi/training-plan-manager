import express from 'express';
import sessions from 'express-session';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import routes from '../api/index.js';

const oneDay = 1000 * 60 * 60 * 24;

export default async ({app}) => {
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));
	app.use(cors());
	app.use(cookieParser());

    // Set session details
	app.use(
		sessions({
			secret: process.env.SESSION_SECRET || 'devsessionsecret',
			saveUninitialized: true,
			cookie: { maxAge: oneDay },
			resave: false,
		})
	);

	// Load API routes
	app.use(routes());

	// Return the express app
	return app;
};