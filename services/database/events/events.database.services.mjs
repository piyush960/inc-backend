import { conceptsQueries, ticketQueries } from '../../../models/index.js';
import { AppError } from '../../../utils/index.js';

function eventsServices(db) {
    async function concepts_getRegistration(email) {
        try {
            const [results] = await db.execute(conceptsQueries.checkRegistration, [email]).catch(err => { throw new AppError(400, 'fail', err.sqlMessage) })
            return results[0]
        } catch (err) {
            throw new AppError(500, 'fail', err)
        }
    }

    async function getTicketDetails(ticket) {
        try {
            const [results] = await db.execute(ticketQueries.checkTicket('*'), [ticket]).catch(err => { throw new AppError(400, 'fail', err.sqlMessage) })
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

    async function editTicketData(ticket, step_no, data) {
        try {
            const [results] = await db.execute(ticketQueries.editStepData(step_no), [data, ticket]).catch(err => { throw new AppError(400, 'fail', err.sqlMessage) })
            return results[0]
        } catch (err) {
            throw new AppError(500, 'fail', err)
        }
    }

    return {
        concepts_getRegistration,
        getTicketDetails,
        getMembersFromTicket,
        insertTicket,
        editTicketData,
    }
}

export default eventsServices;