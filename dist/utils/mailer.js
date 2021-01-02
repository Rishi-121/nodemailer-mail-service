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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mailer = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const ejs_1 = __importDefault(require("ejs"));
const mailer = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const transporter = nodemailer_1.default.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
        },
    });
    yield ejs_1.default.renderFile("../sendgrid-mail-service/src/views/mail.ejs", {
        user: req.body.fullName,
    }, (err, data) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            return err;
        }
        else {
            const mailOptions = {
                from: process.env.MAIL_USER,
                to: req.body.email,
                subject: "Welcome to our Subscriber's Family!",
                html: data,
            };
            yield transporter.sendMail(mailOptions);
        }
    }));
});
exports.mailer = mailer;
//# sourceMappingURL=mailer.js.map