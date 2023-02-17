import { body } from 'express-validator';

function insertMemberValidation() {
    return [
        body('name').trim().notEmpty().isAlpha().escape().withMessage('Invalid name'),
        body('email').isEmail().normalizeEmail({ gmail_remove_dots: false }).withMessage('Invalid email'),
        body('phone').trim().escape().isMobilePhone().withMessage('Invalid phone'),
        body('gender').isIn(['Male', 'Female', 'Other']).withMessage('Invalid gender value'),
    ]
}

export const conceptsValidations = {
    insertMemberValidation,
}