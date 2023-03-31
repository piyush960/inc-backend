import nodemailer from 'nodemailer';
import { projectDomains, slotsData } from '../../static/eventsData.mjs';
import emailTemplates from './htmlGenerators.email.mjs';

const env = process.env

function emailService() {
    const eventEmailTransporter = nodemailer.createTransport({
        pool: true,
        service: 'gmail',
        port: 465,
        auth: {
            user: 'queries.pictinc2023@gmail.com',
            pass: env.EVENTS_EMAIL_PASSWORD
        },
        tls: {
            rejectUnauthorized: false
        }
    })

    const judgingEmailTransporter = nodemailer.createTransport({
        pool: true,
        service: 'gmail',
        port: 465,
        auth: {
            user: 'incjudging@pict.edu',
            pass: env.JUDGE_EMAIL_PASSWORD
        },
        tls: {
            rejectUnauthorized: false
        }
    })

    async function eventRegistrationEmail(data) {
        try {
            const mailOptions = {
                from: `InC'2023 queries.pictinc2023@gmail.com`,
                to: `${data.step_2[0].name} ${data.step_2[0].email}`,
                bcc: 'queries.pictinc2023@gmail.com',
                replyTo: 'queries.pictinc2023@gmail.com',
                subject: `Registered for PICT InC 2023 - ${data.event_name}`,
                priority: 'high',
                text: 'Email content',
                html: await emailTemplates.eventRegistrationEmail(data)
            }
            return eventEmailTransporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                    throw err
                }
                return info
            })
        } catch (err) { throw err }
    }

    async function judgeRegistrationEmail(judge) {
        try {
            judge.domains = judge.domains.map(domain => projectDomains[domain])
            judge.slots = judge.slots.map(slot => slotsData[slot])
            const mailOptions = {
                from: 'InC\'2023 Judging <incjudging@pict.edu>',
                to: `${judge.name} ${judge.email}`,
                bcc: 'queries.pictinc2023@gmail.com',
                replyTo: 'queries.pictinc2023@gmail.com',
                subject: 'Registered for PICT InC 2023 Judging',
                priority: 'high',
                text: 'Email content',
                html: await emailTemplates.judgeRegistrationEmail(judge)
            }
            return judgingEmailTransporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                    throw err
                }
                return info
            })
        } catch (err) { throw err }
    }

    return {
        eventRegistrationEmail,
        judgeRegistrationEmail,
    }
}

export default emailService;