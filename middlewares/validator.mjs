import { validationResult } from 'express-validator';
import { AppError } from '../utils/index.js';

function validator(req, _, next) {
    const errors = validationResult(req);
    // console.log(errors);
    if (errors.isEmpty()) {
        return next();
    }
    const extractedErrors = errors.array();

    next(new AppError(422, 'fail', extractedErrors));
}


export default validator;