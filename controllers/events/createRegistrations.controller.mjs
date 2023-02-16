import { sendCookie, randomID, AppError } from '../../utils/index.js';

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

    async function concepts_insertMember(req, res, next) {
        try {
            const { ticket } = req.signedCookies
            const member_details = JSON.parse(JSON.parse(req.body.member_details))
            const existing_members = await eventsServices.getMembersFromTicket(ticket) || []
            if (Array.isArray(existing_members.step_2)) {
                if (existing_members.step_2.length === 5)
                    throw new AppError(400, 'fail', 'Maximum number of members reached')
                else await eventsServices.editTicketData(ticket, 2, [...existing_members.step_2, member_details])
            } else await eventsServices.editTicketData(ticket, 2, [{ ...member_details }])
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
        concepts_insertMember,
        concepts_saveCollegeDetails
    }
}

export default createRegistrationsController;