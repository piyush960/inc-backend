const env = process.env

function ticketQueries(tableName) {
    const checkTicket = (columns) => `SELECT ${columns} FROM ${tableName} WHERE ticket = :ticket;`

    const getPendingPayments = env.GET_PENDING_PAYMENTS

    const getPayment = env.GET_PAYMENT

    const insertTicket = env.INSERT_TICKET

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