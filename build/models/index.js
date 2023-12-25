"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const secrets_const_1 = __importDefault(require("../constants/secrets.const"));
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const sequelize = new sequelize_1.Sequelize(secrets_const_1.default.databaseUrl, { dialect: "postgres", logging: false });
exports.sequelize = sequelize;
const db = {};
exports.db = db;
const basename = path_1.default.basename(__filename);
(0, fs_1.readdir)(__dirname, (error, files) => {
    if (error)
        throw new Error(error.message);
    Promise.all(files
        .filter((file) => file.indexOf(".") != 0 && (file.endsWith(".model.js") || file.endsWith(".model.ts")) && file != basename)
        .map((file) => Promise.resolve(`${path_1.default.join(__dirname, file)}`).then(s => __importStar(require(s))))).then((imports) => __awaiter(void 0, void 0, void 0, function* () {
        for (const file of imports) {
            const model = file.default(sequelize);
            db[model.name] = model;
        }
        // associate db
        Object.values(db).forEach((model) => {
            model.associate && model.associate(db);
        });
        sequelize.sync();
    }));
});
