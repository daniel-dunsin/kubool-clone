"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
function paginate({ model, page, limit, query, include, }) {
    return __awaiter(this, void 0, void 0, function* () {
        page = page || 1;
        limit = limit || 10;
        return yield model
            .findAndCountAll({
            where: Object.assign({}, query),
            order: [["createdAt", "asc"]],
            offset: (page - 1) * limit,
            limit,
            include,
        })
            .then(({ rows: data, count: total }) => __awaiter(this, void 0, void 0, function* () {
            return {
                data,
                currentPage: page,
                limit: limit,
                total,
                totalPages: Math.ceil(total / limit),
            };
        }));
    });
}
exports.default = paginate;
