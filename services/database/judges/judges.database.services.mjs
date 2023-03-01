import { judgesQueries } from '../../../models/index.js';
import { AppError } from "../../../utils/index.js";

function judgesServices(db) {
    async function getJudge(data) {
        try {
            const [results] = await db.execute({ sql: judgesQueries.getJudge(data), namedPlaceholders: true }, data).catch(err => { throw new AppError(400, 'fail', err.sqlMessage) })
            return results[0]
        } catch (err) {
            throw err
        }
    }

    async function insertJudge(data) {
        try {
            const [results] = await db.execute({ sql: judgesQueries.insertJudge, namedPlaceholders: true }, data).catch(err => {
                if(err?.code === 'ER_DUP_ENTRY') { throw new AppError(400, 'fail', 'Judge already exists for this email and phone') }
                throw new AppError(400, 'fail', err.sqlMessage) })
            return results[0]
        } catch (err) {
            throw err
        }
    }

    async function loginJudge(data) {
        try {
            const [results] = await db.execute({ sql: judgesQueries.loginJudge, namedPlaceholders: true }, data).catch(err => { throw new AppError(400, 'fail', err.sqlMessage) })
            return results[0]
        } catch (err) {
            throw err
        }
    }

    return {
        getJudge,
        insertJudge,
        loginJudge,
    }
}

export default judgesServices;