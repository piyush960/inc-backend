import { Router } from 'express';
import { gettingJudgesController, creationsJudgesController } from '../../controllers/index.js';


const judgesRouter = Router()

function createJudgesRouter(judgesServices,eventsServices, emailService, middlewares, judgesValidations, adminValidations) {
    const { apiLimiter, registrationLimiter, verifyAdminLogin, validator } = middlewares
    const { insertJudgeValidation, getJudgeValidation, loginJudgeValidation } = judgesValidations
    const { verifyAdminValidation } = adminValidations
    const { getJudge, loginJudge  , getProjects} = gettingJudgesController(judgesServices,eventsServices)
    const { insertJudge } = creationsJudgesController(judgesServices, emailService)
    judgesRouter.use(apiLimiter)
    judgesRouter.get('/:event_name/allocations', validator, getProjects,)
    judgesRouter.get('/verify', getJudgeValidation(), verifyAdminValidation(5), validator, verifyAdminLogin, getJudge)
    judgesRouter.use(registrationLimiter)
    judgesRouter.post('/register', insertJudgeValidation(), validator, insertJudge)
    judgesRouter.post('/login', loginJudgeValidation(), validator, loginJudge)

    return judgesRouter
}

export default createJudgesRouter;

// /judge/concepts_projects/
// /judge/concepts_projects/select Post
// /judge/eventName/allocation


// eventname jid  