const emailEnum = require('../constants/emailType.enum');

module.exports = {
    [emailEnum.WELCOME]: {
        subject: 'Welcome!',
        emailTemplateName: 'welcome'
    },
    
    [emailEnum.FORGOT_PASSWORD]: {
        subject: 'Did you know that you forgot the password? Ba dum tss...',
        emailTemplateName: 'forgotPassword'
    }
};