import { sendCookie, randomID } from '../../utils/index.js';
import { roles } from '../../static/adminData.mjs';

function creationsJudgesController(judgesServices, emailService) {
    async function insertJudge(req, res, next) {
        try {
            const jid = 'INC-J' + randomID(7)
            const password = randomID(8)
            await judgesServices.insertJudge({ ...req.body, jid, password, roles: [roles[5]] })
            emailService.judgeRegistrationEmail({ ...req.body, jid })
            sendCookie(
                res,
                { jid },
                `/judge`
            ).status(201).end()
        } catch (err) { next(err) }
    }

    return {
        insertJudge
    }
}

export default creationsJudgesController;