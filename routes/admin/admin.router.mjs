import { Router } from 'express';
import { adminController } from '../../controllers/index.js';

const adminRouter = Router()

function createAdminRouter(adminServices, middlewares, adminValidations) {
    const { registrationLimiter, validator } = middlewares
    const { adminLoginValidation, createAdminValidation, verifyAdminTicket } = adminValidations
    const { loginAdmin, verifyAdminLogin } = adminController(adminServices)
    adminRouter.get('/verify', verifyAdminTicket(), validator, verifyAdminLogin)
    adminRouter.use(registrationLimiter)
    adminRouter.post('/login', adminLoginValidation(), validator, loginAdmin)

    return adminRouter
}

export default createAdminRouter;