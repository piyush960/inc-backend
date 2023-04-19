import { Router } from 'express';
import { createAllocationController } from '../../controllers/index.js';

const allocationsRouter = Router()

function createAllocationsRouter(emailServices, allocationServices, eventsServices, judgeServices, middlewares, adminValidations,) {
    const { verifyAdminLogin, validator } = middlewares
    const { verifyAdminValidation } = adminValidations
    const { labAllocate, allocate } = createAllocationController(allocationServices, emailServices, eventsServices, judgeServices)

    allocationsRouter.patch("/:event_name/lab", verifyAdminValidation(2), validator, verifyAdminLogin, labAllocate)
    allocationsRouter.post("/:event_name/allocate", verifyAdminValidation(2), validator, verifyAdminLogin, allocate)

    return allocationsRouter
}

export default createAllocationsRouter;