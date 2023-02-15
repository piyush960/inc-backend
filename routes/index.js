import { middlewares } from '../middlewares/index.js';
import { healthCheck, undefinedRoute, globalError, adminController } from '../controllers/index.js';
import { adminValidations, eventsValidations } from '../models/index.js';
import createAdminRouter from './admin/admin.router.mjs';
import createEventsRouter from './events/events.router.mjs';

function connectRouter(server, databaseService) {
    server.get('/', healthCheck)
    server.use(middlewares.apiLimiter)
    server.use('/admin', createAdminRouter(adminController(databaseService.adminServices), middlewares, adminValidations))
    server.use('/events', createEventsRouter(databaseService.eventsServices, middlewares, eventsValidations))
    server.use('*', undefinedRoute)
    server.use(globalError)
    return server
}

export {
    connectRouter,
}