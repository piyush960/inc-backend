import { Router } from 'express';
import { getRegistrationsController, createRegistrationsController } from '../../controllers/index.js';

const eventsRouter = Router()

function createEventsRouter(eventsServices, middlewares, eventsValidations) {
    const { registrationLimiter, validator, memberIDParser } = middlewares
    const { ticketValidation, paymentValidation } = eventsValidations
    const { getPaymentDetails, getTicketDetails, concepts_checkUserRegistration } = getRegistrationsController(eventsServices)
    const { concepts_saveProject, concepts_insertMember, concepts_saveCollegeDetails } = createRegistrationsController(eventsServices)
    eventsRouter.get('/verify', paymentValidation(), validator, getPaymentDetails)
    eventsRouter.get('/ticket/verify', ticketValidation(), validator, getTicketDetails)
    eventsRouter.get('/concepts/user-verify', concepts_checkUserRegistration)
    eventsRouter.use(registrationLimiter)
    eventsRouter.post('/concepts/step_1', concepts_saveProject)
    eventsRouter.post('/concepts/step_2', memberIDParser,  validator, concepts_insertMember)
    eventsRouter.post('/concepts/step_3', ticketValidation(), validator, concepts_saveCollegeDetails)

    return eventsRouter
}

export default createEventsRouter;