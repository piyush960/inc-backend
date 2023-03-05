import { AppError } from '../../utils/index.js';

function getRegistrationsController(eventsServices, filesServices) {
    async function getUserRegistration(req, res, next) {
        try {
            const { event_name } = req.params
            const { email } = req.query
            const user_email = await eventsServices.getUserRegistration(event_name, email)
            if (!user_email) throw new AppError(404, 'fail', `Email ${user_email} not registered for ${event_name}`)
            res.status(302).json(user)
        } catch (err) { next(err) }
    }

    async function getRegistration(req, res, next) {
        try {
            const results = await eventsServices.getTicketDetails(req.query.ticket)
            if (!results) throw new AppError(404, 'fail', 'Invalid ticket, registration does not exist')
            if (results.step_no === 4) throw new AppError(400, 'fail', 'Registration under verification')
            if (results.step_no !== 5) throw new AppError(400, 'fail', 'Registration steps incomplete')
            if (results.step_no === 5) res.status(302).json(results)
        } catch (err) { next(err) }
    }

    async function getTicketDetails(req, res, next) {
        try {
            const { ticket } = req.signedCookies
            const results = await eventsServices.getTicketDetails(ticket)
            if (!results) throw new AppError(404, 'fail', 'Invalid ticket exists in cookie')
            delete results['pid']
            delete results['payment_id']
            delete results['date']
            res.status(302).json(results)
        } catch (err) { next(err) }
    }

    async function getPaymentDetails(req, res, next) {
        try {
            const results = await eventsServices.getPaymentDetails(req.query.pid, req.params.event_name)
            if (!results) throw new AppError(404, 'fail', 'Invalid pid, registration does not exist')
            res.status(302).json(results)
        } catch (err) { next(err) }
    }

    async function getUserIDFile(req, res, next) {
        try {
            const results = await filesServices.checkFile(req.query.email)
            if (!results) throw new AppError(404, 'fail', 'No file exist for this email')
            res.status(302).json({ data: results.file })
        } catch (err) { next(err) }
    }

    async function getPendingPayments(req, res, next) {
        try {
            const results = await eventsServices.getPendingPayments(req.params.event_name)
            if (!results) throw new AppError(404, 'fail', 'No pending payments')
            res.status(302).json(results)
        } catch (err) { next(err) }
    }

    return {
        getUserRegistration,
        getRegistration,
        getTicketDetails,
        getPaymentDetails,
        getUserIDFile,
        getPendingPayments,
    }
}

export default getRegistrationsController;