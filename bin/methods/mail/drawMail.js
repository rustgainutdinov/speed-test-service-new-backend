"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function drawMail(data) {
    let htmlText = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
        <link href="https://fonts.googleapis.com/css?family=Roboto:400,500&display=swap" rel="stylesheet">
</head>
<body style="margin: 0; padding: 0">
<table align="center" cellpadding="0" cellspacing="0" width="100%" style="font-family: 'Roboto', sans-serif; ">
    <tr>
        <td bgcolor="#f3faff" style="font-weight: 400; font-size: 36px; text-align: center; padding: 30px; border: none; line-height: 1.2em;">
            iSpring | speed-test
        </td>
    </tr>
<tr>    <td style="border: none; padding: 20px">`;
    let isTestDataEmpty = true;
    for (let url in data) {
        if (data[url]) {
            const mobileText = drawUrlTable(data[url].mobile, url, 'mobile');
            const desktopText = drawUrlTable(data[url].desktop, url, 'desktop');
            if (mobileText || desktopText) {
                isTestDataEmpty = false;
            }
            htmlText += mobileText + desktopText;
        }
    }
    if (isTestDataEmpty) {
        htmlText += '<b style="font-size: 18px">Упавшие показатели отсутствуют</b>';
    }
    return htmlText + `</td></tr></table></body></html>`;
}
function drawUrlTable(urlData, url, mode) {
    let isPerformanceFall = false;
    let htmlUrlsTableText = drawTableTitle(url + ' (' + mode + ')');
    htmlUrlsTableText += '<table align="center" cellpadding="0" cellspacing="0" width="100%" style="text-align: left; margin-top: 25px">';
    htmlUrlsTableText += drawTableHead();
    urlData.forEach((rowData) => {
        if (rowData.indicator === 'performance') {
            isPerformanceFall = true;
        }
        htmlUrlsTableText += drawTableRow(rowData);
    });
    if (isPerformanceFall) {
        htmlUrlsTableText += `</table>`;
    }
    else {
        htmlUrlsTableText = '';
    }
    return htmlUrlsTableText;
}
function drawTableTitle(title) {
    return ` <p style = "font-size: 18px; color: #1890ff; font-weight: 500;" >${title}</p>`;
}
function drawTableHead() {
    return `<tr bgcolor="fafafa" style="font-size: 14px;">
                    <td style="padding: 10px; border-bottom: 1px solid #e8e8e8;  font-weight: 500; border-radius: 6px 0 0 0">Наименование показателя</td>
                    <td style="padding: 10px; border-bottom: 1px solid #e8e8e8; font-weight: 500">Седний показатель за прошедший месяц</td>
                    <td style="padding: 10px; border-bottom: 1px solid #e8e8e8; font-weight: 500">Текущий показатель</td>
                    <td style="padding: 10px; border-bottom: 1px solid #e8e8e8; font-weight: 500; border-radius: 0 6px 0 0">Падение на</td>
                </tr>`;
}
function drawTableRow(data) {
    return `<tr style="font-size: 14px; font-weight: 400">
                    <td style="padding: 10px; border-bottom: 1px solid #e8e8e8;">${data.indicator !== 'performance' ? data.indicator : '<b>' + data.indicator + '<b>'}</td>
                    <td style="padding: 10px; border-bottom: 1px solid #e8e8e8;">${data.before}</td>
                    <td style="padding: 10px; border-bottom: 1px solid #e8e8e8;">${data.after}</td>
                    <td style="padding: 10px; border-bottom: 1px solid #e8e8e8;">${data.change}</td>
                </tr>`;
}
exports.default = drawMail;
