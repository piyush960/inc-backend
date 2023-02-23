import { Router } from 'express';
import { gettingJudgesController, creationsJudgesController } from '../../controllers/index.js';

const judgesRouter = Router()

function createJudgesRouter(judgesServices, middlewares, judgesValidations, adminValidations) {
    const { apiLimiter, registrationLimiter, verifyAdminLogin, validator } = middlewares
    const { insertJudgeValidation, getJudgeValidation, loginJudgeValidation } = judgesValidations
    const { verifyAdminValidation } = adminValidations
    const { getJudge, loginJudge } = gettingJudgesController(judgesServices)
    const { insertJudge } = creationsJudgesController(judgesServices)
    judgesRouter.use(registrationLimiter)
    judgesRouter.post('/register', insertJudgeValidation(), validator, insertJudge)
    judgesRouter.post('/login', loginJudgeValidation(), validator, loginJudge)
    judgesRouter.use(apiLimiter)
    judgesRouter.get('/verify', getJudgeValidation(), verifyAdminValidation(5), validator, verifyAdminLogin, getJudge)

    return judgesRouter
}

export default createJudgesRouter;