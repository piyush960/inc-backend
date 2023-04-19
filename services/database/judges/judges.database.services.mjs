import { judgesQueries } from '../../../models/index.js';
import { AppError } from "../../../utils/index.js";
import { eventsName } from '../../../static/eventsData.mjs';

function judgesServices(db) {
    async function getJudge(data) {
        try {
            const [results] = await db.execute(judgesQueries.getJudge, [data.columns, data.jid]).catch(err => { throw new AppError(400, 'fail', err.sqlMessage) })
            return results[0]
        } catch (err) {
            throw err
        }
    }

    async function getJudges(event_name) {
        try {
            const [results] = await db.execute(judgesQueries.getJudges(event_name)).catch(err => { throw new AppError(400, 'fail', err.sqlMessage) })
            return results[0]
        } catch (err) {
            throw err
        }
    }

    async function insertJudge(data) {
        try {
            await db.execute({ sql: judgesQueries.insertJudge, namedPlaceholders: true }, data)
            return
        } catch (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                if (err.sqlMessage.includes('PRIMARY')) return
                throw new AppError(400, 'fail', 'Judge already exists for given email-phone combination')
            }
            throw new AppError(400, 'fail', err.sqlMessage)
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

    async function getAllocatedProjects(jid){
        try {

            const [conceptsResults] = await db.execute(judgesQueries.getAllocatedProjects(jid,eventsName[0])).catch(err => { throw new AppError(400, 'fail', err.sqlMessage) })
            const [impetuResults] = await db.execute(judgesQueries.getAllocatedProjects(jid,eventsName[1])).catch(err => {throw new AppError(400,'fail' , err.sqlMessage)} )
            return {concepts:conceptsResults , impetus: impetuResults}
        } catch (err) {
            throw err
        }
    }



    return {
        getJudge,
        getJudges,
        insertJudge,
        loginJudge,
        getAllocatedProjects
    }
}

export default judgesServices;