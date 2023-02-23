function ticketQueries(tableName) {
    const checkTicket = (columns) => `SELECT ${columns} FROM ${tableName} WHERE ticket = :ticket;`

    const insertTicket = `INSERT INTO ${tableName} VALUES (?, '', ?, '{}', '{}', 1, '');`

    const editStepData = (step_no) => `UPDATE ${tableName} SET step_${step_no} = ?, step_no = ? WHERE ticket = ?;`

    const editPaymentAndStep = `UPDATE ${tableName} SET step_no = ?, payment_id = ? WHERE ticket = ?;`

    return {
        checkTicket,
        insertTicket,
        editStepData,
        editPaymentAndStep,
    }
}

export { ticketQueries }