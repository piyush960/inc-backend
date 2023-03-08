import path from 'path';
import { readFileSync } from 'fs';
import * as ejs from 'ejs';

const __dirname = path.resolve()
const eventsTemplate = readFileSync(__dirname + '/views/emails/eventRegistration.email.ejs', 'utf8')
const judgeTemplate = readFileSync(__dirname + '/views/emails/judgeRegistration.email.ejs', 'utf8')

async function eventRegistrationEmail(data) {
    try {
        return await ejs.render(eventsTemplate, { data, filename: __dirname + '/views/emails/eventRegistration.email.ejs', cache: true, async: true })
    } catch (err) {
        throw err
    }
}

async function judgeRegistrationEmail(judge) {
    try {
        return await ejs.render(judgeTemplate, { judge, filename: __dirname + '/views/emails/judgeRegistration.email.ejs', cache: true, async: true })
    } catch (err) {
        throw err
    }
}

export default {
    eventRegistrationEmail,
    judgeRegistrationEmail,
}