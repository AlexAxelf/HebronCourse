const nodemailer     = require('nodemailer');
const ApiError = require('../error/apiError');

const emailTemplatesList = require('../email-templates');
const Email = require('email-templates');
const path = require('path');
const { HOST, HOST_MAIL, HOST_MAIL_PASSWORD } = require('../config/config');

module.exports = {

    send: async (receiver, action, locals = {}) => {
        const templateRenderer = new Email({ 
            views: {
                root: path.join(process.cwd(), 'email-templates')
            }
        });

        const template = emailTemplatesList[action];

        locals = { ...locals, host: HOST };

        if(!action) {
            throw new ApiError('Template not found');
        }

        const renderResult = await templateRenderer.render(action.emailTemplateName)
        
        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: HOST_MAIL,
                pass: HOST_MAIL_PASSWORD
            }
        });

        await transport.sendMail({
            from: 'no-reply',
            to: receiver,
            subject: templateRenderer,
            subject: template.subject,
            html
        });

    }

};