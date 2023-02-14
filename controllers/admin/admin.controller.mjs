import { AppError, createToken, sendCookie, clearCookie } from '../../utils/index.js';

function adminController(adminService) {
	async function login(req, res, next) {
		try {
			const { username, password } = req.body
			const user = await adminService.findAdmin(username)
			if (!user) throw new AppError(404, 'fail', 'Admin account does not exist')
			if (user.password !== password) {
				res = await clearCookie(res, 'data', '/admin')
				throw new AppError(403, 'fail', 'Invalid Credentials')
			}
			const token = createToken({ username })
			sendCookie(
				res,
				{ data: { admin: token, roles: user.roles.roles } },
				'/admin'
			).status(200).end()
		} catch (err) { next(new AppError(500, 'fail', err.message || err)) }
	}

	return {
		login,
	}
}

export default adminController;