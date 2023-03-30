import { Router } from 'express';
import { gettingJudgesController, creationsJudgesController } from '../../controllers/index.js';

const judgesRouter = Router()

function createJudgesRouter(judgesServices, eventsServices, emailService, middlewares, judgesValidations, adminValidations, eventsValidations) {
    const { apiLimiter, registrationLimiter, verifyAdminLogin, validator } = middlewares
    const { insertJudgeValidation, getJudgeValidation, loginJudgeValidation } = judgesValidations
    const { verifyAdminValidation } = adminValidations
    const { eventNameParamValidation } = eventsValidations
    const { getJudge, loginJudge, getProjects } = gettingJudgesController(judgesServices, eventsServices)
    const { insertJudge } = creationsJudgesController(judgesServices, emailService)
    judgesRouter.use(apiLimiter)
    judgesRouter.get('/:event_name/allocations', eventNameParamValidation(), validator, getProjects,)
    judgesRouter.get('/verify', getJudgeValidation(), verifyAdminValidation(5), validator, verifyAdminLogin, getJudge)
    judgesRouter.use(registrationLimiter)
    judgesRouter.post('/register/:event_name', eventNameParamValidation(), insertJudgeValidation(), validator, insertJudge)
    judgesRouter.post('/login', loginJudgeValidation(), validator, loginJudge)

    return judgesRouter
}

export default createJudgesRouter;