"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function validate(schema) {
    return (req, res, next) => {
        schema
            .validate({ body: req.body, query: req.query, params: req.params })
            .then(() => next())
            .catch((e) => next(e));
    };
}
exports.default = validate;
