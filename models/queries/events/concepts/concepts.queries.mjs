function conceptsQueries(tableName) {
    const checkRegistration = `SELECT * FROM ${tableName} WHERE email = ?;`

    const completeConceptsRegistration = (no_of_members) => {
        let placeholders = ''
        for (i = 0; i < no_of_members; i++) placeholders += ', ?, ?, ?, ?'
        return process.env[`INSERT_CONCEPTS_${no_of_members}`] + placeholders + ');'
    }

    return {
        checkRegistration,
        completeConceptsRegistration,
    }
}

export { conceptsQueries }