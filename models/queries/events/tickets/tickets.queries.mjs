function ticketQueries(tableName) {
    const checkTicket = `SELECT * FROM ${tableName} WHERE ticket = ?;`

    const insertTicket = `INSERT INTO ${tableName} VALUES (?, ?, '{}', '{}', 1, '');`

    const editStepData = (step_no) => `UPDATE ${tableName} SET step_${step_no} = ? WHERE ticket = ?;`

    return {
        checkTicket,
        insertTicket,
        editStepData
    }
}

export { ticketQueries }