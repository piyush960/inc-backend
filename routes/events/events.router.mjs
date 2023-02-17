import { Router } from 'express';
import { getRegistrationsController, createRegistrationsController } from '../../controllers/index.js';

const eventsRouter = Router()

function createEventsRouter(eventsServices, filesServices, middlewares, eventsValidations) {
    const { registrationLimiter, validator, memberIDParser, formDataParser } = middlewares
    const { ticketValidation, paymentValidation, fileValidation, insertMemberValidation } = eventsValidations
    const { getPaymentDetails, getTicketDetails, getUserIDFile, getUserRegistration } = getRegistrationsController(eventsServices, filesServices)
    const { concepts_saveProject, concepts_insertMember, concepts_saveCollegeDetails } = createRegistrationsController(eventsServices, filesServices)
    eventsRouter.get('/verify', paymentValidation(), validator, getPaymentDetails)
    eventsRouter.get('/verify/ticket', ticketValidation(), validator, getTicketDetails)
    eventsRouter.get('/verify/file', fileValidation(), validator, getUserIDFile)
    eventsRouter.get('/verify/user/:event_name', getUserRegistration)
    eventsRouter.use(registrationLimiter)
    eventsRouter.post('/concepts/step_1', concepts_saveProject)
    eventsRouter.post('/concepts/step_2', memberIDParser, formDataParser, insertMemberValidation(), validator, concepts_insertMember)
    eventsRouter.post('/concepts/step_3', ticketValidation(), validator, concepts_saveCollegeDetails)

    return eventsRouter
}

export default createEventsRouter;