import { sendCookie, randomID, AppError } from '../../utils/index.js';
import { eventsName, teamSize } from '../../static/eventsData.mjs';
import { pictDetails } from '../../static/collegeDetails.mjs';

function createRegistrationsController(eventsServices, filesServices) {
    async function saveProject(req, res, next) {
        try {
            const { event_name } = req.params
            const { ticket } = req.signedCookies
            if (ticket) {
                await eventsServices.editStepData(ticket, 1, req.body)
                res.status(200).end()
            } else {
                const ticket = 'INC-' + event_name[0].toUpperCase() + randomID(12)
                await eventsServices.insertTicket({ ticket, step_1: req.body })
                sendCookie(
                    res,
                    { ticket },
                    `/events/${event_name}`
                ).status(200).end()
            }
        } catch (err) { next(err) }
    }

    async function insertMember(req, res, next) {
        try {
            const { event_name } = req.params
            const { ticket } = req.signedCookies
            const member_details = req.body
            const member_id_file = req.file
            const existing_members = await eventsServices.getMembersFromTicket(ticket)
            if (!existing_members) throw new AppError(404, 'fail', 'Ticket does not exist')
            if (Array.isArray(existing_members.step_2)) {
                if (existing_members.step_2.length === teamSize.get(event_name))
                    throw new AppError(400, 'fail', 'Maximum number of members reached')
                else {
                    existing_members.step_2.forEach(member => {
                        if (member.email === member_details.email)
                            throw new AppError(400, 'fail', 'Duplicate email address found in a team')
                    })
                    await filesServices.insertFile(member_details.email, member_id_file)
                    await eventsServices.editStepData(ticket, 2, [...existing_members.step_2, member_details])
                }
            } else {
                await filesServices.insertFile(member_details.email, member_id_file)
                await eventsServices.editStepData(ticket, 2, [{ ...member_details }])
            }
            sendCookie(
                res,
                { ticket },
                `/events/${event_name}`
            ).status(200).end()
        } catch (err) { next(err) }
    }

    async function saveCollegeDetails(req, res, next) {
        try {
            const { ticket } = req.signedCookies
            if (req.body.isPICT === '1') {
                req.body = { ...req.body, ...pictDetails }
            }
            await eventsServices.editStepData(ticket, 3, req.body)
            sendCookie(
                res,
                { ticket },
                `/events/${req.params.event_name}`
            ).status(200).end()
        } catch (err) { next(err) }
    }

    async function requestRegistration(req, res, next) {
        try {
            const { ticket } = req.signedCookies
            const results = await eventsServices.getTicketDetails(ticket)
            if (!results) throw new AppError(404, 'fail', 'Ticket does not exist')
            if (results.step_no === 4) throw new AppError(400, 'fail', 'Registration done using this ticket and payment under verification')
            else if (results.step_no === 3) {
                if (req.body?.isPICT === '1') {
                    req.body = { ticket, payment_id: 'PICT' }
                }
                if (req.body?.isInternational === '1') {
                    req.body = { ticket, payment_id: 'INTERNATIONAL' }
                }
                await eventsServices.editPaymentAndStep(req.body, 4)
                res.status(200).end()
            }
            else if (results.step_no === 5 && results.payment_id !== '') throw new AppError(400, 'fail', 'Registration already completed using this ticket')
            else throw new AppError(400, 'fail', 'Registration steps not completed')
        } catch (err) { next(err) }
    }

    async function verifyPendingPayment(req, res, next) {
        try {
            const { ticket } = req.body
            const results = await eventsServices.getTicketDetails(ticket)
            if (!results) throw new AppError(404, 'fail', 'Ticket does not exist')
            if (results.step_no === 4) {
                await eventsServices.completeRegistration(req.params.event_name, { ...req.body, payment_id: results.payment_id })
                res.status(200).end()
            }
            else if (results.step_no === 5 && results.payment_id !== '') throw new AppError(400, 'fail', 'Registration already completed using this ticket')
            else throw new AppError(400, 'fail', 'Registration steps not completed')
        } catch (err) { next(err) }
    }

    return {
        saveProject,
        insertMember,
        saveCollegeDetails,
        requestRegistration,
        verifyPendingPayment,
    }
}

export default createRegistrationsController;