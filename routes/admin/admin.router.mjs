import { Router } from 'express';
import { adminController } from '../../controllers/index.js';

const adminRouter = Router()

function createAdminRouter(adminServices, middlewares, adminValidations) {
    const { registrationLimiter, validator } = middlewares
    const { adminLoginValidation, createAdminValidation } = adminValidations
    const { loginAdmin } = adminController(adminServices)
    adminRouter.use(registrationLimiter)
    adminRouter.post('/login', adminLoginValidation(), validator, loginAdmin)

    return adminRouter
}

export default createAdminRouter;