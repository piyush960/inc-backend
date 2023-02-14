import { AppError } from '../../utils/index.js';

function getRegistrationsController(eventsServices) {
    async function checkConceptsRegistration(req, res, next) {
        try {
            const { email } = req.query
            const user = await eventsServices.getConceptsRegistration(email)
            if (!user) throw new AppError(404, 'fail', 'Email not registered for concepts')
            res.status(200).json(user)
        } catch (err) { next(err.message || err) }
    }

    return {
        checkConceptsRegistration,
    }
}

export default getRegistrationsController;