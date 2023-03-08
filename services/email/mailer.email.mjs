import nodemailer from 'nodemailer';
import { projectDomains, slotsData } from '../../static/eventsData.mjs';
import emailTemplates from './htmlGenerators.email.mjs';

const env = process.env

function emailService() {
    const transporter = nodemailer.createTransport({
        pool: true,
        service: 'gmail',
        port: 465,
        auth: {
            user: env.EMAIL_ADDRESS,
            pass: env.EMAIL_PASSWORD
        },
        tls: {
            rejectUnauthorized: false
        }
    })

    async function eventRegistrationEmail(data) {
        try {
            const mailOptions = {
                from: `InC'2023 ${env.EMAIL_ADDRESS}`,
                to: `${data.step_2[0].name} ${data.step_2[0].email}`,
                bcc: env.EMAIL_ADDRESS,
                replyTo: env.EMAIL_ADDRESS,
                subject: `Registered for PICT InC 2023 - ${data.event_name}`,
                priority: 'high',
                text: 'Email content',
                html: await emailTemplates.eventRegistrationEmail(data)
            }
            return transporter.sendMail(mailOptions, (err, info) => {
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
                from: `InC'2023 ${env.EMAIL_ADDRESS}`,
                to: `${judge.name} ${judge.email}`,
                bcc: env.EMAIL_ADDRESS,
                replyTo: env.EMAIL_ADDRESS,
                subject: 'Registered for PICT InC 2023 Judging',
                priority: 'high',
                text: 'Email content',
                html: await emailTemplates.judgeRegistrationEmail(judge)
            }
            return transporter.sendMail(mailOptions, (err, info) => {
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