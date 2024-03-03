import { Router } from 'express';
import { referralController } from '../../controllers/index.js';

const referralRouter = Router()

function createReferralRouter() {
    const { referralConcepts, referralImpetus } = referralController()

    referralRouter.post('/concepts', referralConcepts)
    referralRouter.post('/impetus', referralImpetus )

    return referralRouter
}

export default createReferralRouter;