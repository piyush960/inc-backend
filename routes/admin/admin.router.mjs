import { Router } from 'express';
import { adminController } from '../../controllers/index.js';
import judgesServices from '../../services/database/judges/judges.database.services.mjs';

const adminRouter = Router()

function createAdminRouter(adminServices, docServices, middlewares, adminValidations) {
    const { registrationLimiter, validator } = middlewares
    const { adminLoginValidation, createAdminValidation, verifyAdminTicket, verifyAdminValidation } = adminValidations
    const { loginAdmin, verifyAdminLogin, logout } = adminController(adminServices, docServices, judgesServices)
    adminRouter.get('/verify', verifyAdminTicket(), validator, verifyAdminLogin)
    adminRouter.use(registrationLimiter)
    adminRouter.post('/login', adminLoginValidation(), validator, loginAdmin)
    adminRouter.get('/logout', validator, logout)

    return adminRouter
}

export default createAdminRouter;