function conceptsQueries(tableName) {
    const checkRegistration = `SELECT * FROM ${tableName} WHERE email = ?;`

    return {
        checkRegistration,
    }
}

export { conceptsQueries }