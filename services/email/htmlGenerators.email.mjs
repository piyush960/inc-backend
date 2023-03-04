import path from 'path';
import { readFileSync } from 'fs';
import * as ejs from 'ejs';

const __dirname = path.resolve()
const judgeTemplate = readFileSync(__dirname + '/views/emails/judgeRegistration.email.ejs', 'utf8')

async function judgeRegistrationEmail(judge) {
    try {
        return await ejs.render(judgeTemplate, { judge, filename: __dirname + '/views/emails/judgeRegistration.email.ejs', cache: true, async: true })
    } catch (err) {
        console.error(err)
        throw err
    }
}

export default {
    judgeRegistrationEmail,
}