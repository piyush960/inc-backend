import { eventsName } from '../../../static/eventsData.mjs';

function eventsQueries(tableName) {
    const checkUserRegistration = (event_name) => {
        switch (event_name) {
            case eventsName[0]:
                return `SELECT email FROM ${tableName.conceptsUsersTable} WHERE email = ?;`
            case eventsName[1]:
                return `SELECT email FROM ${tableName.impetusUsersTable} WHERE email = ?;`
            case eventsName[2]:
                return `SELECT email FROM ${tableName.pradnyaUsersTable} WHERE email = ?;`
        }
    }

    const completeRegistration = (event_name, no_of_members) => {
        let placeholders = ''
        for (let i = 0; i < no_of_members; i++) placeholders += ', ?, ?, ?, ?'
        return process.env[`INSERT_${event_name.toUpperCase()}_${no_of_members}`] + placeholders + ');'
    }

    return {
        checkUserRegistration,
        completeRegistration,
    }
}

export { eventsQueries }