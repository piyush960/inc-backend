import { Router } from 'express';
import { gettingJudgesController, creationsJudgesController } from '../../controllers/index.js';

const judgesRouter = Router()

function createJudgesRouter(judgesServices, eventsServices, emailService, middlewares, judgesValidations, adminValidations, eventsValidations) {
    const { apiLimiter, registrationLimiter, verifyJudgeLogin, validator } = middlewares
    const { insertJudgeValidation, getJudgeValidation, loginJudgeValidation } = judgesValidations
    const { verifyJudgeValidation } = adminValidations
    const { eventNameParamValidation } = eventsValidations
    const { getJudgeFromToken, getJudgeFromJid, loginJudge, getProjects, getJudges, getAllocatedProjects, modifySlots } = gettingJudgesController(judgesServices, eventsServices)
    const { insertJudge, evaluateProject } = creationsJudgesController(judgesServices, emailService)
    judgesRouter.use(apiLimiter)
    judgesRouter.get('/:event_name/allocations', eventNameParamValidation(), validator, getProjects)
    judgesRouter.get('/registration/view/:event_name', eventNameParamValidation(), validator, getJudges)
    judgesRouter.get('/verify', getJudgeValidation(), verifyJudgeValidation(7), verifyJudgeLogin, getJudgeFromToken)
    judgesRouter.get('/allocations/:jid', getAllocatedProjects)
    judgesRouter.get('/:jid', getJudgeValidation(), getJudgeFromJid)
    judgesRouter.patch('/modify_slots/:jid', modifySlots)
    judgesRouter.post('/:event_name/evaluate', evaluateProject)
    judgesRouter.use(registrationLimiter)
    judgesRouter.post('/register/', insertJudgeValidation(), validator, insertJudge)
    judgesRouter.post('/login', loginJudgeValidation(), validator, loginJudge)

    return judgesRouter
}

export default createJudgesRouter;