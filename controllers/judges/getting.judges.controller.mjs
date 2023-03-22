import { AppError, clearCookie, createToken, sendCookie, verifyToken } from '../../utils/index.js';

function gettingJudgesController(judgesServices , eventsServices) {
    async function getJudge(req, res, next) {
        try {
            const {token}  = req.signedCookies
            console.log(token)
           
            const judge = await judgesServices.getJudge({jid:token,columns:'*'})
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
         
            sendCookie(
                res,
                { token : judge.jid },
                '/judge'
            ).status(200).end()
        } catch (err) { next(err) }
    }
    async function getProjects(req,res,next)
    {
        try{
            const results = await eventsServices.getProjects(req.params.event_name)
            if(!results)  throw new AppError(404,'fail','No Projects Found')
            res.status(200).json(results)
        }catch(err){
            next(err)

        }
    }

    return {
        getJudge,
        loginJudge,
        getProjects
    }
}

export default gettingJudgesController;