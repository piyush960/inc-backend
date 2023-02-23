import { body, cookie, oneOf, query } from 'express-validator';

function ticketValidation() {
    return [
        cookie('ticket', 'Error while handling ticket').trim().isLength({ min: 17, max: 18 }).escape().isAlphanumeric({ ignore: '-' }).withMessage('Invalid ticket in cookies'),
    ]
}

function paymentValidation() {
    return [
        query('ticket', 'Error while handling query').trim().isLength({ min: 17, max: 18 }).isAlphanumeric('en-US', { ignore: '-' }).escape().withMessage('Invalid request, ticket required in query'),
    ]
}

function fileValidation() {
    return [
        query('email', 'Error while handling query').exists().withMessage('Invalid request, email required in query').isEmail().normalizeEmail({ gmail_remove_dots: false }).withMessage('Invalid email'),
    ]
}

function verifyPICTOrPayments() {
    return [
        oneOf([
            cookie('ticket').if(body('isPICT').equals('1')).exists().trim().isLength({ min: 17, max: 18 }).isAlphanumeric('en-US', { ignore: '-' }).escape().withMessage('Invalid ticket in cookies'),
            body('udf1').exists().trim().isLength({ min: 17, max: 18 }).escape().withMessage('Invalid request, udf1 required in body')
        ])
    ]
}

export const ticketValidations = {
    ticketValidation,
    paymentValidation,
    fileValidation,
    verifyPICTOrPayments,
}