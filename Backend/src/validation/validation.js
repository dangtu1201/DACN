import Joi from 'joi';

export function registerValidator (data) {
    const rule = Joi.object({
        phone: Joi.string().min(6).max(225).required(),
        email: Joi.string().min(6).max(225).required().email(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,20}$')).required(),
    }).options({allowUnknown: true});

    return rule.validate(data);
}

export function editUserValidator (data) {
    const rule = Joi.object({
        phone: Joi.string().min(6).max(225),
        email: Joi.string().min(6).max(225).email(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,20}$')),
    }).options({allowUnknown: true});

    return rule.validate(data);
}

export function loginValidator(data) {
    const rule = Joi.object({
        phone: Joi.string().required(),
        password: Joi.string().required(),
    }).options({allowUnknown: true});

    return rule.validate(data);
}

// module.exports.registerValidator = registerValidator;
