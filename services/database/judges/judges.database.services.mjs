import { judgesQueries } from '../../../models/index.js';
import { AppError } from "../../../utils/index.js";

function judgesServices(db) {
    async function getJudge(data) {
        try {
            const [results] = await db.execute({ sql: judgesQueries.getJudge(data), namedPlaceholders: true }, data).catch(err => { throw new AppError(400, 'fail', err.sqlMessage) })
            return results[0]
        } catch (err) {

        }
    }

    async function insertJudge(data) {
        try {
            const [results] = await db.execute({ sql: judgesQueries.insertJudge, namedPlaceholders: true }, data).catch(err => { throw new AppError(400, 'fail', err.sqlMessage) })
            return results[0]
        } catch (err) {
            throw new AppError(500, 'fail', err.message || err)
        }
    }

    async function loginJudge(data) {
        try {
            const [results] = await db.execute({ sql: judgesQueries.loginJudge, namedPlaceholders: true }, data).catch(err => { throw new AppError(400, 'fail', err.sqlMessage) })
            return results[0]
        } catch (err) {

        }
    }

    return {
        getJudge,
        insertJudge,
        loginJudge,
    }
}

export default judgesServices;