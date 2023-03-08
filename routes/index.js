import { healthCheck, undefinedRoute, globalError } from '../controllers/index.js';
import { adminValidations, eventsValidations, judgesValidations } from '../models/index.js';
import createAdminRouter from './admin/admin.router.mjs';
import createEventsRouter from './events/events.router.mjs';
import createJudgesRouter from './judges/judges.router.mjs';

function connectRouter(server, databaseService, emailService, middlewares) {
    const { adminServices, eventsServices, filesServices, judgesServices } = databaseService
    server.get('/', healthCheck)
    server.use(middlewares.apiLimiter)
    server.use('/admin', createAdminRouter(adminServices, middlewares, adminValidations))
    server.use('/events', createEventsRouter(eventsServices, filesServices, emailService, middlewares, eventsValidations,adminValidations))
    server.use('/judge', createJudgesRouter(judgesServices, emailService, middlewares, judgesValidations, adminValidations))
    server.use('*', undefinedRoute)
    server.use(globalError)
    return server
}

export {
    connectRouter,
}