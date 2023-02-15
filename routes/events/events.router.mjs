import { Router } from 'express';
import { getRegistrationsController, createRegistrationsController } from '../../controllers/index.js';

const eventsRouter = Router()

function createEventsRouter(eventsServices, middlewares, eventsValidations) {
    const { registrationLimiter, validator } = middlewares
    const { ticketValidation, paymentValidation } = eventsValidations
    eventsRouter.get('/verify', paymentValidation(), validator, getRegistrationsController(eventsServices).getPaymentDetails)
    eventsRouter.get('/ticket/verify', ticketValidation(), validator, getRegistrationsController(eventsServices).getTicketDetails)
    eventsRouter.get('/concepts/user-verify', getRegistrationsController(eventsServices).concepts_checkUserRegistration)
    eventsRouter.use(registrationLimiter)
    eventsRouter.post('/concepts/step_1', createRegistrationsController(eventsServices).concepts_saveProject)
    eventsRouter.post('/concepts/step_2', ticketValidation(), validator, createRegistrationsController(eventsServices).concepts_saveTeam)
    eventsRouter.post('/concepts/step_3', ticketValidation(), validator, createRegistrationsController(eventsServices).concepts_saveCollegeDetails)

    return eventsRouter
}

export default createEventsRouter;