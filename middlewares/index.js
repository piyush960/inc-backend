import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { apiLimiter, registrationLimiter } from './rateLimiter.mjs';
import protectRoute from './protectRoute.mjs';
import validator from './validator.mjs';

function useDefaultMiddlewares(server) {
    server.use([
        cors(), // Allow Cross-Origin requests,
        cookieParser(process.env.COOKIE_SECRET), // Parse Cookie header and populate req.signedCookie with an object keyed by the cookie names
        helmet(), // Set security HTTP headers
        express.json({ // Body parser, reading data from body into req.body
            limit: '100kb'
        })
    ])
    return server
}

export const middlewares = {
    useDefaultMiddlewares,
    apiLimiter,
    registrationLimiter,
    protectRoute,
    validator
}