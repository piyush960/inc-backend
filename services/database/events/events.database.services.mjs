import { eventsQueries, ticketQueries } from '../../../models/index.js';
import { AppError } from '../../../utils/index.js';

function eventsServices(db) {
    async function getRegistration(event_name, email) {
        try {
            const [results] = await db.execute(eventsQueries.checkRegistration(event_name), [email]).catch(err => { throw new AppError(400, 'fail', err.sqlMessage) })
            return results[0]
        } catch (err) {
            throw new AppError(500, 'fail', err)
        }
    }

    async function getTicketDetails(ticket) {
        try {
            const [results] = await db.execute({ sql: ticketQueries.checkTicket('*'), namedPlaceholders: true }, { ticket }).catch(err => { throw new AppError(400, 'fail', err.sqlMessage) })
            return results[0]
        } catch (err) {
            throw new AppError(500, 'fail', err)
        }
    }

    async function getMembersFromTicket(ticket) {
        try {
            const [results] = await db.execute(ticketQueries.checkTicket('step_2'), [ticket]).catch(err => { throw new AppError(400, 'fail', err.sqlMessage) })
            return results[0]
        } catch (err) {
            throw new AppError(500, 'fail', err)
        }
    }

    async function insertTicket(ticket, data) {
        try {
            const [results] = await db.execute(ticketQueries.insertTicket, [ticket, data]).catch(err => { throw new AppError(400, 'fail', err.sqlMessage) })
            return results[0]
        } catch (err) {
            throw new AppError(500, 'fail', err)
        }
    }

    async function editStepData(ticket, step_no, data) {
        try {
            const [results] = await db.execute(ticketQueries.editStepData(step_no), [data, step_no, ticket]).catch(err => { throw new AppError(400, 'fail', err.sqlMessage) })
            console.log(results);
            return results[0]
        } catch (err) {
            throw new AppError(500, 'fail', err)
        }
    }

    async function editPaymentAndStep(ticket, updated_step, payment_id) {
        try {
            const [results] = await db.execute(ticketQueries.editPaymentAndStep, [updated_step, payment_id, ticket]).catch(err => { throw new AppError(400, 'fail', err.sqlMessage) })
            console.log(results);
            return results[0]
        } catch (err) {
            throw new AppError(500, 'fail', err)
        }
    }

    return {
        getRegistration,
        getTicketDetails,
        getMembersFromTicket,
        insertTicket,
        editStepData,
        editPaymentAndStep,
    }
}

export default eventsServices;