import { AppError, createToken, sendCookie, clearCookie } from '../../utils/index.js';

function adminController(adminService) {
	async function loginAdmin(req, res, next) {
		try {
			const { username, password } = req.body
			const user = await adminService.findAdmin(username)
			if (!user) throw new AppError(404, 'fail', 'Admin account does not exist')
			if (user.password !== password) {
				res = await clearCookie(res, 'admin_data', '/')
				throw new AppError(403, 'fail', 'Invalid Credentials')
			}
			const token = createToken({ username })
			sendCookie(
				res,
				{ admin_data: { token, roles: user.roles } },
				'/'
			).status(200).end()
		} catch (err) { next(err) }
	}

	return {
		loginAdmin,
	}
}

export default adminController;