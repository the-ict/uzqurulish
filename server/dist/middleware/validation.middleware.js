"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const validate = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            res.status(400).json({
                message: 'Validation error',
                details: error.details,
            });
            return;
        }
        next();
    };
};
exports.validate = validate;
//# sourceMappingURL=validation.middleware.js.map