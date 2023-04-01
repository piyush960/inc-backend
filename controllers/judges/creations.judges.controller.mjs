import { sendCookie, randomID } from '../../utils/index.js';
import { groupLinks, roles } from '../../static/adminData.mjs';

function creationsJudgesController(judgesServices, emailService) {
    async function insertJudge(req, res, next) {
        try {
            const { event_name } = req.params
            const jid = 'INC-J' + randomID(7)
            const password = randomID(8)
            await judgesServices.insertJudge({ ...req.body, jid, password, events: [event_name], roles: [roles[6]] })
            await emailService.judgeRegistrationEmail({ ...req.body, jid, events: [event_name], password, group_link: groupLinks.get(event_name) })
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