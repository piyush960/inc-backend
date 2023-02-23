import { body, check, oneOf } from 'express-validator';
import { eventsName, projectDomains, slotsData } from '../../../static/eventsData.mjs';

function getJudgeValidation() {
    return [
        oneOf([
            check('jid').trim().isLength({ min: 12, max: 12 }).escape().isAlphanumeric('en-US', { ignore: '-' }).withMessage('Invalid judge id'),
            check('email').isEmail().normalizeEmail({ gmail_remove_dots: false }).withMessage('Invalid email'),
            check('phone').trim().escape().isMobilePhone().withMessage('Invalid phone'),
        ])
    ]
}

function insertJudgeValidation() {
    const projectDomainsArray = Object.keys(projectDomains)
    const slotsDataArray = Object.keys(slotsData)

    return [
        body('name').trim().isLength({ min: 3, max: 100 }).isAlpha('en-US', { ignore: ' .' }).escape().withMessage('Invalid name'),
        body('email').isEmail().normalizeEmail({ gmail_remove_dots: false }).withMessage('Invalid email'),
        body('phone').trim().escape().isMobilePhone().withMessage('Invalid phone'),
        body('address').trim().isLength({ min: 5, max: 100 }).isAlphanumeric('en-US', { ignore: ' ,.-\'' }).escape().withMessage('Invalid address'),
        body('company').trim().isLength({ min: 0, max: 100 }).isAlphanumeric('en-US', { ignore: ' ,.-\'' }).escape().withMessage('Invalid company name'),
        body('exp').trim().isInt({ min: 0, max: 90 }).escape().withMessage('Invalid year of experience'),
        body('events').isArray({ min: 1, max: 2 }).custom(events => events.every(event => eventsName.includes(event.trim()))).withMessage('Invalid events selected'),
        body('domains').isArray({ min: 1, max: 6 }).custom(domains => domains.every(domain => projectDomainsArray.includes(domain.trim()))).withMessage('Invalid domains selected'),
        body('slots').isArray({ min: 1, max: 4 }).custom(slots => slots.every(slot => slotsDataArray.includes(slot.trim()))).withMessage('Invalid slots selected'),
        body('min_projects').trim().isInt({ min: 3, max: 10 }).escape().withMessage('Invalid minimum projects selected'),
    ]
}

function loginJudgeValidation() {
    return [
        body('username').isEmail().normalizeEmail({ gmail_remove_dots: false }).withMessage('Invalid email'),
        body('password').trim().isLength({ min: 8, max: 100 }).escape().withMessage('Invalid password'),
    ]
}

export const judgesValidations = {
    getJudgeValidation,
    insertJudgeValidation,
    loginJudgeValidation,
}