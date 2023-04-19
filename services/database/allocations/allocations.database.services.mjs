import { allocationQueries } from "../../../models/index.js";
import { AppError } from "../../../utils/index.js";

function allocationServices(db) {
    async function updateLab(event_name, data) {
        try {
            const preparedArray = [data.lab, ...data.pids]
            const [results] = await db.execute(allocationQueries.updateLab(event_name, data), preparedArray).catch(err => { 
                console.log(err); throw new AppError(400, 'fail', err.sqlMessage) })
                return results[0]
        } catch (err) {
            throw err
        }
    }

    async function allocate(event_name, data) {
        try {
            const [results] = await db.execute(allocationQueries.allocate(event_name, data)).catch(err => { 
                console.log(err); throw new AppError(400, 'fail', err.sqlMessage) })
                return results[0]
        } catch (err) {
            throw err
        }
    }

    return {
        updateLab,
        allocate,
    }
}

export default allocationServices;