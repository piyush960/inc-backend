import { AppError } from '../../utils/index.js';

function getRegistrationsController(eventsServices, filesServices) {
    async function getUserRegistration(req, res, next) {
        try {
            const { event_name } = req.params
            const { email } = req.query
            const user = await eventsServices.getRegistration(event_name, email)
            if (!user) throw new AppError(404, 'fail', `Email not registered for ${event_name}`)
            res.status(302).json(user)
        } catch (err) { next(err) }
    }

    async function getTicketDetails(req, res, next) {
        try {
            const { ticket } = req.signedCookies
            const results = await eventsServices.getTicketDetails(ticket)
            if (!results) throw new AppError(404, 'fail', 'Invalid ticket exists in cookie')
            delete results['pid']
            delete results['payment_id']
            res.status(302).json(results)
        } catch (err) { next(err) }
    }

    async function getPaymentDetails(req, res, next) {
        try {
            const results = await eventsServices.getTicketDetails(req.query.pid)
            if (!results) throw new AppError(404, 'fail', 'Invalid pid, payment does not exist')
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

    return {
        getUserRegistration,
        getTicketDetails,
        getPaymentDetails,
        getUserIDFile
    }
}

export default getRegistrationsController;