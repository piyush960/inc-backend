import { AppError, sendCookie, randomID } from '../../utils/index.js';

function createRegistrationsController(eventsServices) {
    async function createConceptsRegistration(req, res, next) {
        try {
            const { email } = req.body
            const user = await eventsServices.getConceptsRegistration(email)
            if (!user) throw new AppError(404, 'fail', 'Email not registered for concepts')
            res.status(200).json(user)
        } catch (err) { next(new AppError(500, 'fail', err.message || err)) }
    }

    async function saveConceptsProject(req, res, next) {
        try {
            const ticket = req.signedCookies.ticket
            if (ticket) {
                const _ = await eventsServices.updateTicketData(ticket, 1, req.body)
                res.status(200).end()
            } else {
                const ticket = 'INC-' + randomID(13)
                const _ = await eventsServices.insertTicket(ticket, req.body)
                sendCookie(
                    res,
                    { ticket },
                    '/events/concepts'
                ).status(200).end()
            }
        } catch (err) { next(err.message || err) }
    }

    return {
        createConceptsRegistration,
        saveConceptsProject,
    }
}

export default createRegistrationsController;