import path from 'path';
import { readFileSync } from 'fs';
import * as ejs from 'ejs';

const __dirname = path.resolve()

async function judgeRegistrationEmail(judge) {
    try {
        const judgeTemplate = readFileSync(__dirname + '/views/emails/judgeRegistration.email.ejs', 'utf8')
        return ejs.render(judgeTemplate, { judge, filename: __dirname + '/views/emails/judgeRegistration.email.ejs', cache: false })
    } catch (err) {
        console.error(err)
        throw err
    }
}

export default {
    judgeRegistrationEmail,
}