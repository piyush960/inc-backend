function ticketQueries(tableName) {
    const checkTicket = `SELECT * FROM ${tableName} WHERE ticket = ?;`

    const insertTicket = `INSERT INTO ${tableName} (ticket, step_1, step_2, step_3, step_no, payment_id ) VALUES (?, ?, '{}', '{}', 1, '');`

    const updateTicketData = (step_no) => `UPDATE ${tableName} SET step_${step_no} = ? WHERE ticket = ?;`

    return {
        checkTicket,
        insertTicket,
        updateTicketData
    }
}

export { ticketQueries }