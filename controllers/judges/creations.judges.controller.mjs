import { sendCookie, randomID } from '../../utils/index.js';
import { roles } from '../../static/adminData.mjs';

function creationsJudgesController(judgesServices, emailService) {
    async function insertJudge(req, res, next) {
        try {
            const jid = 'INC-J' + randomID(7)
            const password = randomID(8)
            await judgesServices.insertJudge({ ...req.body, jid, password, roles: [roles[6]] })
            await emailService.judgeRegistrationEmail({ ...req.body, jid, password })
            sendCookie(
                res,
                { jid },
                `/admin/judge`
            ).status(201).end()
        } catch (err) { next(err) }
    }

    return {
        insertJudge
    }
}

export default creationsJudgesController;