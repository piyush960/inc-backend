import adminServices from './admin/admin.database.services.mjs';
import eventsServices from './events/events.database.services.mjs';

function databaseService(db) {
    return {
        adminServices: adminServices(db),
        eventsServices: eventsServices(db),
    }
}

export default databaseService;