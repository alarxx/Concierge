const nodemailer = require('nodemailer');

const { Mailer } = require('../models/models-manager');
const ApiError = require("../exceptions/ApiError");
const logger = require('../log/logger')('mail-service');

class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        });
    }

    async antispam(email){
        // Проверить что мейл не был отправлен недавно
        const mailer = await Mailer.findOne({ email });

        if(!mailer){
            return await new Mailer({ email }).save();
        }

        const updatedAt = new Date(mailer.updatedAt);
        const deltaTime = Date.now() - updatedAt;
        if (deltaTime < (60 * 1000)) {
            const timeLeftToSend = Math.floor(((60 * 1000) - deltaTime) / 1000);
            throw ApiError.BadRequest(`Not enough time has passed since the last letter was sent. Try again after ${timeLeftToSend} seconds`)
        }

        mailer.updatedAt = Date.now();
        // Обновить время последнего отправления
        await mailer.save();
    }

    async sendMail({ email, subject, text, html }){
        await this.antispam(email);

        const mail = await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to: email,
            subject,
            text,
            html
        });

        logger.log("mail:", mail)

        return mail;
    }

    async sendActivationMail(email, link){
        return await this.sendMail({
            email,
            subject: `Account activation ${process.env.API_URL}`,
            text: 'Hello. This email is for your email verification.',
            html: `
                <div>
                    <h1>To activate account, click on the link</h1>
                    <a href="${link}">${link}</a>
                </div>
            `
        });
    }
    async sendResetPasswordMail(email, link){
        return await this.sendMail({
            email,
            subject: `Set password ${process.env.API_URL}`,
            text: 'Hello. This email is to change the password on your account.',
            html: `
                <div>
                    <h1>To set the password, click on the link</h1>
                    <a href="${link}">${link}</a>
                </div>
            `
        });
    }



}

module.exports = new MailService();
