import IUrlsChangedIndicatorsMap from "../../interfaces/testData/IUrlsChangedIndicatorsMap";
import drawMail from "./drawMail";

const nodemailer = require("nodemailer");

function sendMail(to: Array<string>, subject: string, data: IUrlsChangedIndicatorsMap) {

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
        text: drawMail(data),
        html: drawMail(data),
    });
}

export default sendMail