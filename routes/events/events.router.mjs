import { Router } from 'express';
import { getRegistrationsController, createRegistrationsController } from '../../controllers/index.js';

const eventsRouter = Router()

function createEventsRouter(eventsServices, middlewares, eventsValidations = {}) {
    const { registrationLimiter, validator } = middlewares
    // const { checkRegistrationValidation } = eventsValidations
    eventsRouter.get('/concepts/verify', getRegistrationsController(eventsServices).checkConceptsRegistration)
    eventsRouter.use(registrationLimiter)
    eventsRouter.post('/concepts/step_1', createRegistrationsController(eventsServices).saveConceptsProject)

    return eventsRouter
}

export default createEventsRouter;