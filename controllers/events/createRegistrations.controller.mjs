import { sendCookie, randomID, AppError } from '../../utils/index.js';
import { eventsName, teamSize } from '../../static/eventsData.mjs';
import { pictDetails } from '../../static/collegeDetails.mjs';

function createRegistrationsController(eventsServices, filesServices, emailService) {
    async function saveProject(req, res, next) {
        try {
            const { event_name } = req.params
            const { ticket } = req.signedCookies
            if (ticket) {
                await eventsServices.editStepData(ticket, 1, req.body)
                res.status(200).end()
            } else {
                const ticket = 'INC-' + event_name[0].toUpperCase() + randomID(12)
                await eventsServices.insertTicket({ ticket, step_1: req.body, step_2: {}, step_no: 1 })
                sendCookie(res, { ticket }, `/register/events/${event_name}`).status(200).end()
            }
        } catch (err) { next(err) }
    }

    async function insertMember(req, res, next) {
        try {
            const { event_name } = req.params
            let { ticket } = req.signedCookies
            const { email } = req.body
            const user_email = await eventsServices.getUserRegistration(event_name, email)
            if (user_email) throw new AppError(404, 'fail', `Email ${user_email.email} already registered for ${event_name}`)
            const member_id_file = req.file
            if (event_name === eventsName[2] && !ticket) {
                ticket = 'INC-' + event_name[0].toUpperCase() + randomID(12)
                await eventsServices.insertTicket({ ticket, step_1: {}, step_2: [{ ...req.body }], step_no: 2 })
                await filesServices.insertFile(email, member_id_file)
                sendCookie(
                    res,
                    { ticket },
                    `/register/events/${event_name}`
                ).status(201).end()
                return
            }
            const existing_members = await eventsServices.getMembersFromTicket(ticket)
            if (!existing_members) throw new AppError(404, 'fail', 'Ticket does not exist')
            if (Array.isArray(existing_members.step_2)) {
                if (existing_members.step_2.length === teamSize.get(event_name))
                    throw new AppError(400, 'fail', 'Maximum number of members reached')
                else {
                    existing_members.step_2.forEach(member => {
                        if (member.email === email)
                            throw new AppError(400, 'fail', 'Duplicate email address found in a team')
                    })
                    await filesServices.insertFile(email, member_id_file)
                    await eventsServices.editStepData(ticket, 2, [...existing_members.step_2, req.body])
                }
            } else {
                await filesServices.insertFile(email, member_id_file)
                await eventsServices.editStepData(ticket, 2, [{ ...req.body }])
            }
            sendCookie(
                res,
                { ticket },
                `/register/events/${event_name}`
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
                `/register/events/${req.params.event_name}`
            ).status(200).end()
        } catch (err) { next(err) }
    }

    async function requestRegistration(req, res, next) {
        try {
            const { ticket } = req.signedCookies
            let results = await eventsServices.getTicketDetails(ticket)
            if (!results) throw new AppError(404, 'fail', 'Ticket does not exist')
            if (results.payment_id !== '') throw new AppError(400, 'fail', 'Registration done using this ticket and payment under verification')
            else if (results.step_no === 3) {
                const { isPICT, isInternational } = req.body
                if (isPICT === '1') {
                    req.body = { ...req.body, payment_id: 'PICT' }
                } else if (isInternational === '1') {
                    req.body = { ...req.body, payment_id: 'INTERNATIONAL' }
                }
                await eventsServices.editPaymentAndStep({ ...req.body, ticket }, 4)
                res.status(201).end()
            }
            else if (results.step_no === 5 && results.payment_id !== '') throw new AppError(400, 'fail', 'Registration already completed using this ticket')
            else throw new AppError(400, 'fail', 'Registration steps not completed')
        } catch (err) { next(err) }
    }

    async function verifyPendingPayment(req, res, next) {
        try {
            const { ticket } = req.body
            const { event_name } = req.params
            const results = await eventsServices.getTicketDetails(ticket)
            if (!results) throw new AppError(404, 'fail', 'Ticket does not exist')
            if (results.step_no === 4) {
                await eventsServices.completeRegistration(event_name, results)
                await emailService.eventRegistrationEmail(results, event_name)
                res.status(201).end()
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