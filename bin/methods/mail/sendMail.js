"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const drawMail_1 = require("./drawMail");
const nodemailer = require("nodemailer");
function sendMail(to, subject, data) {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: 'rustamikc@gmail.com',
            pass: 'gv9y3ytsow'
        }
    });
    transporter.sendMail({
        from: '"Fred Foo 👻" <foo@example.com>',
        to: to.toString(),
        subject,
        text: drawMail_1.default(data),
        html: drawMail_1.default(data),
    });
}
exports.default = sendMail;
