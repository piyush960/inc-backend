function eventsQueries(tableName) {
    const checkUserRegistration = (event_name) => {
        switch (event_name) {
            case 'concepts':
                return `SELECT * FROM ${tableName.conceptsUsersTable} WHERE email = ?;`
            case 'impetus':
                return `SELECT * FROM ${tableName.impetusUsersTable} WHERE email = ?;`
            case 'pradnya':
                return `SELECT * FROM ${tableName.pradnyaUsersTable} WHERE email = ?;`
        }
    }

    return {
        checkUserRegistration,
    }
}

export { eventsQueries }