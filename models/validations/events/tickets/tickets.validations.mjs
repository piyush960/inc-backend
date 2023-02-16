import { cookie, query } from 'express-validator';

function ticketValidation() {
    return [
        cookie('ticket', 'Error while handling ticket').trim().isLength({ min: 17, max: 18 }).escape().withMessage('Invalid ticket in cookies'),
    ]
}

function insertMemberValidation() {
    return [

    ]
}

function paymentValidation() {
    return [
        query('pid', 'Error while handling query').trim().isLength({ min: 17, max: 18 }).escape().withMessage('Invalid request, pid required in query'),
    ]
}

export const ticketValidations = {
    ticketValidation,
    insertMemberValidation,
    paymentValidation
}