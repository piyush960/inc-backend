import express from 'express';
import connectDatabase from './database.js';
import { databaseService, emailService } from '../services/index.js';
import initializeMiddlewares from '../middlewares/index.js';
import { connectRouter } from '../routes/index.js';
import testEmail from '../test/emailing.js'

var server = express()

const db = connectDatabase()
const dbService = databaseService(db)
const emailServices = emailService()

const middlewares = initializeMiddlewares(dbService)

server = middlewares.useDefaultMiddlewares(server)

await testEmail()

server = connectRouter(server, dbService, emailServices, middlewares)

export default server;