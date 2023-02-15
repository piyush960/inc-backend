import { AppError } from '../../utils/index.js';

function getRegistrationsController(eventsServices) {
    async function concepts_checkUserRegistration(req, res, next) {
        try {
            const { email } = req.query
            const user = await eventsServices.getConceptsRegistration(email)
            if (!user) throw new AppError(404, 'fail', 'Email not registered for concepts')
            res.status(200).json(user)
        } catch (err) { next(err) }
    }

    async function getTicketDetails(req, res, next) {
        try {
            const { ticket } = req.signedCookies
            const results = await eventsServices.getTicketDetails(ticket)
            if (!results) throw new AppError(404, 'fail', 'Invalid ticket exists in cookie')
            res.status(200).json(results)
        } catch (err) { next(err) }
    }

    async function getPaymentDetails(req, res, next) {
        try {
            const { pid } = req.query
            const results = await eventsServices.getTicketDetails(pid)
            if (!results) throw new AppError(404, 'fail', 'Invalid pid, payment does not exist')
            res.status(200).json(results)
        } catch (err) { next(err) }
    }

    return {
        concepts_checkUserRegistration,
        getTicketDetails,
        getPaymentDetails,
    }
}

export default getRegistrationsController;