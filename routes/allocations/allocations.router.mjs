import { Router } from 'express';
import { createAllocationController } from '../../controllers/index.js';

const allocationsRouter = Router()

function createAllocationsRouter(adminServices, emailServices, allocationServices, middlewares, adminValidations) {
    const { verifyAdminLogin, validator } = middlewares
    const { adminLoginValidation, createAdminValidation, verifyAdminTicket, verifyAdminValidation } = adminValidations
    const { labAllocate , allocate } = createAllocationController(allocationServices, emailServices)

    allocationsRouter.patch("/:event_name/lab", labAllocate)
    allocationsRouter.patch("/:event_name/allocate", allocate)
    
    return allocationsRouter
}

export default createAllocationsRouter;