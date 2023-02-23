import express from 'express';
import connectDatabase from './database.js';
import { databaseService } from '../services/index.js';
import initializeMiddlewares from '../middlewares/index.js';
import { connectRouter } from '../routes/index.js';

var server = express()

const db = connectDatabase()
const dbService = databaseService(db)

const middlewares = initializeMiddlewares(dbService)

server = middlewares.useDefaultMiddlewares(server)


server = connectRouter(server, dbService, middlewares)

export default server;