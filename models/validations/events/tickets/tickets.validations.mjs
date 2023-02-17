import { cookie, query } from 'express-validator';

function ticketValidation() {
    return [
        cookie('ticket', 'Error while handling ticket').trim().isLength({ min: 17, max: 18 }).escape().withMessage('Invalid ticket in cookies'),
    ]
}

function paymentValidation() {
    return [
        query('pid', 'Error while handling query').trim().isLength({ min: 17, max: 18 }).escape().withMessage('Invalid request, pid required in query'),
    ]
}

function fileValidation() {
    return [
        query('email', 'Error while handling query').exists().withMessage('Invalid request, email required in query').isEmail().normalizeEmail({ gmail_remove_dots: false }).withMessage('Invalid email'),
    ]
}

export const ticketValidations = {
    ticketValidation,
    paymentValidation,
    fileValidation
}