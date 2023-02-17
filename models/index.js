import { adminValidations as _adminValidations } from './validations/index.js';
import { conceptsValidations as _conceptsValidations } from './validations/index.js';
import { ticketValidations as _ticketValidations } from './validations/index.js';
import { adminQueries as _adminQueries } from './queries/admin/admin.queries.mjs';
import { eventsQueries as _eventsQueries } from './queries/events/events.queries.mjs';
import { conceptsQueries as _conceptsQueries } from './queries/events/concepts/concepts.queries.mjs';
import { ticketQueries as _ticketQueries } from './queries/events/tickets/tickets.queries.mjs';
import { filesQueries as _filesQueries } from './queries/files/files.queries.mjs';

const env = process.env

const tables = {
    adminTableName: env.ADMIN_TABLE_NAME,
    conceptsUsersTable: env.CONCEPTS_USERS_TABLE,
    ticketTable: env.TICKET_TABLE,
    filesTable: env.FILES_TABLE,
}

export const adminValidations = { ..._adminValidations }
export const eventsValidations = { ..._conceptsValidations, ..._ticketValidations }
export const adminQueries = _adminQueries(tables.adminTableName)
export const eventsQueries = _eventsQueries(tables)
export const conceptsQueries = _conceptsQueries(tables.conceptsUsersTable)
export const ticketQueries = _ticketQueries(tables.ticketTable)
export const filesQueries = _filesQueries(tables.filesTable)