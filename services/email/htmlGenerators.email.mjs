import path from 'path';
import { readFileSync } from 'fs';
import * as ejs from 'ejs';

const __dirname = path.resolve()
const eventsTemplate = readFileSync(__dirname + '/views/emails/eventRegistration.email.ejs', 'utf8')
const judgeTemplate = readFileSync(__dirname + '/views/emails/judgeRegistration.email.ejs', 'utf8')
const conceptsJudgeAllocationTemplate = readFileSync(__dirname + '/views/emails/concepts.judgeAllocation.email.ejs', 'utf8')
const impetusJudgeAllocationTemplate = readFileSync(__dirname + '/views/emails/impetus.judgeAllocation.email.ejs', 'utf8')

async function eventRegistrationEmail(data) {
    try {
        return ejs.render(eventsTemplate, { data, filename: __dirname + '/views/emails/eventRegistration.email.ejs', cache: true, async: true })
    } catch (err) {
        throw err
    }
}

async function judgeRegistrationEmail(judge) {
    try {
        return ejs.render(judgeTemplate, { judge, filename: __dirname + '/views/emails/judgeRegistration.email.ejs', cache: true, async: true })
    } catch (err) {
        throw err
    }
}

async function sendAllocationEmail(event_name, projects, judge) {
    try {
        return ejs.render(conceptsJudgeAllocationTemplate, { data: { projects, judge }, filename: __dirname + '/views/emails/concepts.judgeAllocation.email.ejs', cache: true, async: true })
        // switch (event_name) {
        //     case 'concepts':

        //     case 'impetus':
        //         return ejs.render(impetusJudgeAllocationTemplate, { data: { projects, judge }, filename: __dirname + '/views/emails/impetus.judgeAllocation.email.ejs', cache: true, async: true })
        // }
    } catch (err) {
        throw err
    }
}

export default {
    eventRegistrationEmail,
    judgeRegistrationEmail,
    sendAllocationEmail,
}