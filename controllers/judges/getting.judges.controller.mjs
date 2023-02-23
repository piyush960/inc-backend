import { AppError, clearCookie, createToken, sendCookie } from '../../utils/index.js';

function gettingJudgesController(judgesServices) {
    async function getJudge(req, res, next) {
        try {
            const judge = await judgesServices.getJudge(req.query)
            res.status(302).json(judge)
        } catch (err) { next(err) }
    }

    async function loginJudge(req, res, next) {
        try {
            const { username, password } = req.body
            const judge = await judgesServices.loginJudge({ username, password })
            if (!judge) {
                res = await clearCookie(res, 'token', '/judge')
                throw new AppError(404, 'fail', 'Invalid credentials')
            }
            const token = createToken({ jid: judge.jid })
            sendCookie(
                res,
                { token },
                '/judge'
            ).status(200).end()
        } catch (err) { next(err) }
    }

    return {
        getJudge,
        loginJudge,
    }
}

export default gettingJudgesController;