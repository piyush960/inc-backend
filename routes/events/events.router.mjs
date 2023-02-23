import { Router } from 'express';
import { getRegistrationsController, createRegistrationsController } from '../../controllers/index.js';

const eventsRouter = Router()

function createEventsRouter(eventsServices, filesServices, middlewares, eventsValidations) {
    const { registrationLimiter, validator, memberIDParser, formDataParser } = middlewares
    const { ticketValidation, paymentValidation, fileValidation, eventNameParamValidation, getUserRegistrationValidation, projectValidation, memberValidation, collegeValidation, verifyPICTOrPayments } = eventsValidations
    const { getPaymentDetails, getTicketDetails, getUserIDFile, getUserRegistration } = getRegistrationsController(eventsServices, filesServices)
    const { saveProject, insertMember, saveCollegeDetails, completeRegistration } = createRegistrationsController(eventsServices, filesServices)
    eventsRouter.get('/verify', paymentValidation(), validator, getPaymentDetails)
    eventsRouter.get('/verify/ticket', validator, getTicketDetails)
    eventsRouter.get('/verify/file', fileValidation(), validator, getUserIDFile)
    eventsRouter.get('/verify/user/:event_name', eventNameParamValidation(), getUserRegistrationValidation(), validator, getUserRegistration)
    eventsRouter.use(registrationLimiter)
    eventsRouter.post('/:event_name/step_1', eventNameParamValidation(), projectValidation(), validator, saveProject)
    eventsRouter.post('/:event_name/step_2', memberIDParser, formDataParser, eventNameParamValidation(), ticketValidation(), memberValidation(), validator, insertMember)
    eventsRouter.post('/:event_name/step_3', eventNameParamValidation(), ticketValidation(), collegeValidation(), validator, saveCollegeDetails)
    eventsRouter.post('/registration/step_4', eventNameParamValidation(), verifyPICTOrPayments(), validator, completeRegistration)

    return eventsRouter
}

export default createEventsRouter;