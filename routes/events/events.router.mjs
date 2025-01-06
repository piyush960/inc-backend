import { Router } from 'express';
import { getRegistrationsController, createRegistrationsController } from '../../controllers/index.js';


const eventsRouter = Router()

function createEventsRouter(eventsServices, filesServices, emailService, middlewares, eventsValidations, adminValidations, docServices) {
    const { registrationLimiter, verifyAdminLogin, validator, memberIDParser, formDataParser } = middlewares
    const { getPaymentValidation, ticketValidation, getRegistrationValidation, paymentValidation, fileValidation, eventNameParamValidation, getUserRegistrationValidation, projectValidation, memberValidation, collegeValidation, verifyPICTOrPayments } = eventsValidations
    const { verifyAdminValidation } = adminValidations
    const { getPaymentDetails, getTicketDetails, getUserIDFile, getUserRegistration, getRegistration, getRegistrations, getPendingPayments, getSynopsis, getProjectAbstract, updateProjectAbstract, backupRegs } = getRegistrationsController(eventsServices, filesServices, docServices)
    const { saveProject, insertMember, getAddedMembers, saveCollegeDetails, requestRegistration, verifyPendingPayment, updateProject, insertInternalPICT, deleteMember } = createRegistrationsController(eventsServices, filesServices, emailService)

    eventsRouter.get('/ticket', ticketValidation(), validator, getTicketDetails)
    eventsRouter.get('/registrations/:event_name', verifyAdminValidation(2), validator, verifyAdminLogin, getRegistrations)
    eventsRouter.get('/verify/:event_name', eventNameParamValidation(), getPaymentValidation(), verifyAdminValidation(3), validator, verifyAdminLogin, getPaymentDetails)
    eventsRouter.get('/verify/file', fileValidation(), verifyAdminValidation(6), validator, verifyAdminLogin, getUserIDFile)
    eventsRouter.get('/verify/payment/:event_name', eventNameParamValidation(), verifyAdminValidation(3), validator, verifyAdminLogin, getPendingPayments)
    eventsRouter.post('/verify/payment/:event_name', eventNameParamValidation(), paymentValidation(), verifyAdminValidation(3), validator, verifyAdminLogin, verifyPendingPayment)
    eventsRouter.get('/verify/registration', getRegistrationValidation(), validator, getRegistration)
    eventsRouter.get('/:event_name/synopsis', getSynopsis)
    eventsRouter.get('/verify/user/:event_name', eventNameParamValidation(), getUserRegistrationValidation(), validator, getUserRegistration)
    
    eventsRouter.patch('/:event_name/:pid', verifyAdminValidation(2), validator, verifyAdminLogin, updateProject)
    eventsRouter.post('/:event_name/internal', insertInternalPICT)
    eventsRouter.use(registrationLimiter)

    eventsRouter.post('/step_1', saveProject)
    eventsRouter.post('/step_2', memberIDParser, formDataParser, ticketValidation(), memberValidation(), insertMember)
    eventsRouter.get('/getmemberdetails', ticketValidation(), memberValidation(), getAddedMembers)
    eventsRouter.post('/step_3', ticketValidation(), collegeValidation(), saveCollegeDetails)
    eventsRouter.post('/step_4', ticketValidation(), verifyPICTOrPayments(), requestRegistration)
    // Delete member
    eventsRouter.delete('/deletememberdetails', ticketValidation(), memberValidation(), deleteMember)
    // Get project abstract 
    eventsRouter.post('/getabstract', getProjectAbstract)
    eventsRouter.post('/updateabstract', updateProjectAbstract)

    eventsRouter.get('/backupRegs', backupRegs)

    
    
    return eventsRouter
}

export default createEventsRouter;