const axios = require('axios');

let handler = async (m, { conn, args, command }) => {
    // التحقق من إدخال اسم اللاعب
    if (args.length === 0) {
        return conn.reply(m.chat, 'يرجى إدخال اسم اللاعب بعد الأمر.', m);
    }

    // تحويل اسم اللاعب إلى صيغة مناسبة للطلب
    const playerName = args.join('_');
    const url = `https://www.thesportsdb.com/api/v1/json/1/searchplayers.php?p=${playerName}`;

    try {
        const response = await axios.get(url);
        const player = response.data.player ? response.data.player[0] : null;

        // التحقق من وجود اللاعب في قاعدة البيانات
        if (!player) {
            return conn.reply(m.chat, 'لم يتم العثور على معلومات عن اللاعب. يرجى التحقق من صحة الاسم والمحاولة مرة أخرى.', m);
        }

        // تكوين رسالة الرد
        let message = `لاعب كرة القدم الشهير: ${player.strPlayer}\n\n`;
        message += `تاريخ الميلاد: ${player.dateBorn}\n`;
        message += `مكان الميلاد: ${player.strBirthLocation}\n`;
        message += `صورة اللاعب: ${player.strThumb}`;

        // إرسال رسالة الرد مع صورة اللاعب
        await conn.sendFile(m.chat, player.strThumb, 'player.jpg', message);
    } catch (error) {
        console.error('Error fetching player information:', error);
        await conn.reply(m.chat, 'حدث خطأ أثناء جلب معلومات اللاعب. يرجى المحاولة مرة أخرى لاحقًا.', m);
    }
}

handler.command = /^(football|كرة-القدم|كره|لاعب|تاريخ كرة القدم)$/i;
handler.group = false;

module.exports = handler;
