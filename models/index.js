import { adminValidations as _adminValidations } from './validations/index.js';
import { adminQueries as _adminQueries } from './queries/admin/admin.queries.mjs';
import { conceptsQueries as _conceptsQueries } from './queries/events/concepts/concepts.queries.mjs';
import { ticketQueries as _ticketQueries } from './queries/events/tickets/tickets.queries.mjs';

const env = process.env

const tables = {
    adminTableName: env.ADMIN_TABLE_NAME,
    conceptsUsersTable: env.CONCEPTS_USERS_TABLE,
    ticketTable: env.TICKET_TABLE,
}

export const adminValidations = { ..._adminValidations }
export const adminQueries = _adminQueries(tables.adminTableName)
export const conceptsQueries = _conceptsQueries(tables.conceptsUsersTable)
export const ticketQueries = _ticketQueries(tables.ticketTable)