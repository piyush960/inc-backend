import { check } from 'express-validator';

function adminLoginValidation() {
	return [
		check('username').trim().isLength({ min: 6 }).escape(),
		check('password').isLength({ min: 5 }),
	]
}

function createAdminValidation() {
	return [
		check('username').trim().isLength({ min: 6 }).escape(),
		check('password').isLength({ min: 5 }),
		check('role').trim().isArray({ min: 1 }).isIn(['admin', 'webmaster', 'pradyna_admin', 'concepts_admin', 'impetus_admin']).withMessage('Invalid admin role given')
	]
}

export const adminValidations = {
	adminLoginValidation,
	createAdminValidation
}