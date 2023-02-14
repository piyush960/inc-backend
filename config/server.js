import express from 'express';
import { middlewares } from '../middlewares/index.js';
import connectDatabase from './database.js';
import { databaseService } from '../services/index.js';
import { connectRouter } from '../routes/index.js';

var server = express()

server = middlewares.useDefaultMiddlewares(server)

const db = connectDatabase()
const dbService = databaseService(db)

server = connectRouter(server, dbService)

export default server;