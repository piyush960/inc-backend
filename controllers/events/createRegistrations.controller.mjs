import { sendCookie, randomID } from '../../utils/index.js';

function createRegistrationsController(eventsServices) {
    async function concepts_saveProject(req, res, next) {
        try {
            const { ticket } = req.signedCookies
            if (ticket) {
                const _ = await eventsServices.editTicketData(ticket, 1, req.body)
                res.status(200).end()
            } else {
                const ticket = 'INC-C' + randomID(12)
                const _ = await eventsServices.insertTicket(ticket, req.body)
                sendCookie(
                    res,
                    { ticket },
                    '/events/concepts'
                ).status(200).end()
            }
        } catch (err) { next(err) }
    }

    async function concepts_saveTeam(req, res, next) {
        try {
            const { ticket } = req.signedCookies
            const team_members = JSON.parse(req.body.body)
            const _ = await eventsServices.editTicketData(ticket, 2, team_members)
            sendCookie(
                res,
                { ticket },
                '/events/concepts'
            ).status(200).end()
        } catch (err) { next(err) }
    }

    async function concepts_saveCollegeDetails(req, res, next) {
        try {
            const { ticket } = req.signedCookies
            const _ = await eventsServices.editTicketData(ticket, 3, req.body)
            sendCookie(
                res,
                { ticket },
                '/events/concepts'
            ).status(200).end()
        } catch (err) { next(err) }
    }

    return {
        concepts_saveProject,
        concepts_saveTeam,
        concepts_saveCollegeDetails
    }
}

export default createRegistrationsController;