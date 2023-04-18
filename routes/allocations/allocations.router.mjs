import { Router } from 'express';
import { adminController } from '../../controllers/index.js';

const allocationsRouter = Router()

function createAllocationsRouter(adminServices, emailServices, middlewares, adminValidations) {
    const { verifyAdminLogin, validator } = middlewares
    const { adminLoginValidation, createAdminValidation, verifyAdminTicket, verifyAdminValidation } = adminValidations


    return allocationsRouter
}

export default createAllocationsRouter;