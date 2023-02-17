import { query } from 'express-validator';

function getUserRegistrationValidation() {
    return [
        cookie('email', 'Error while handling ticket').trim().isLength({ min: 17, max: 18 }).escape().withMessage('Invalid ticket in cookies'),
    ]
}

export const eventsValidations = {
    getUserRegistrationValidation,
}