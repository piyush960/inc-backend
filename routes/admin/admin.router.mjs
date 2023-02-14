import { Router } from 'express';

const adminRouter = Router()

function createAdminRouter(adminController, middlewares, adminValidations) {
    const { registrationLimiter, validator } = middlewares
    const { adminLoginValidations, createAdminValidations } = adminValidations
    adminRouter.use(registrationLimiter)
    adminRouter.post('/login', adminLoginValidations(), validator, adminController.login)

    return adminRouter
}

export default createAdminRouter;