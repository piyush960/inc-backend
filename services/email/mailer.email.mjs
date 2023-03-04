import nodemailer from 'nodemailer';
import { projectDomains, slotsData } from '../../static/eventsData.mjs';
import emailTemplates from './htmlGenerators.email.mjs';

function emailService() {
    const transporter = nodemailer.createTransport({
        pool: true,
        service: 'gmail',
        port: 465,
        auth: {
            user: process.env.EMAIL_ADDRESS,
            pass: process.env.EMAIL_PASSWORD
        },
        tls: {
            rejectUnauthorized: false
        }
    })

    async function judgeRegistrationEmail(judge) {
        try {
            judge.domains = judge.domains.map(domain => projectDomains[domain])
            judge.slots = judge.slots.map(slot => slotsData[slot])
            const mailOptions = {
                from: `InC'2023 ${process.env.EMAIL_ADDRESS}`,
                to: `${judge.name} ${judge.email}`,
                bcc: `${process.env.EMAIL_ADDRESS}`,
                replyTo: process.env.EMAIL_ADDRESS,
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
        judgeRegistrationEmail,
    }
}

export default emailService;