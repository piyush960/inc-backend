function ticketQueries(tableName) {
    const checkTicket = (columns) => `SELECT ${columns} FROM ${tableName} WHERE ticket = :ticket;`

    const getPendingPayments = process.env.GET_PENDING_PAYMENTS

    const getPayment = process.env.GET_PAYMENT

    const insertTicket = `INSERT INTO ${tableName} VALUES (?, '', ?, '{}', '{}', 1, '');`

    const editStepData = (step_no) => `UPDATE ${tableName} SET step_${step_no} = ?, step_no = ? WHERE ticket = ?;`

    const editPaymentAndStep = `UPDATE ${tableName} SET step_no = ?, payment_id = ? WHERE ticket = ?;`

    return {
        checkTicket,
        getPendingPayments,
        getPayment,
        insertTicket,
        editStepData,
        editPaymentAndStep,
    }
}

export { ticketQueries }