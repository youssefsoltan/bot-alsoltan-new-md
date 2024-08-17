const zodiak = [
    ["Capricorn", new Date(1970, 0, 1)],
    ["Aquarius", new Date(1970, 0, 20)],
    ["Pisces", new Date(1970, 1, 19)],
    ["Aries", new Date(1970, 2, 21)],
    ["Taurus", new Date(1970, 3, 21)],
    ["Gemini", new Date(1970, 4, 21)],
    ["Cancer", new Date(1970, 5, 22)],
    ["Leo", new Date(1970, 6, 23)],
    ["Virgo", new Date(1970, 7, 23)],
    ["Libra", new Date(1970, 8, 23)],
    ["Scorpio", new Date(1970, 9, 23)],
    ["Sagittarius", new Date(1970, 10, 22)],
    ["Capricorn", new Date(1970, 11, 22)]
].reverse();

function getZodiac(month, day) {
    let d = new Date(1970, month - 1, day);
    return zodiak.find(([_, _d]) => d >= _d)[0];
}

const zodiacImages = {
    "Capricorn": "https://telegra.ph/file/1ac32965e723a693dd35a.jpg",
    "Aquarius": "https://telegra.ph/file/1ac32965e723a693dd35a.jpg",
    "Pisces": "https://telegra.ph/file/1ac32965e723a693dd35a.jpg",
    "Aries": "https://telegra.ph/file/1ac32965e723a693dd35a.jpg",
    "Taurus": "https://telegra.ph/file/1ac32965e723a693dd35a.jpg",
    "Gemini": "https://telegra.ph/file/1ac32965e723a693dd35a.jpg",
    "Cancer": "https://telegra.ph/file/1ac32965e723a693dd35a.jpg",
    "Leo": "https://telegra.ph/file/1ac32965e723a693dd35a.jpg",
    "Virgo": "https://telegra.ph/file/1ac32965e723a693dd35a.jpg",
    "Libra": "https://telegra.ph/file/1ac32965e723a693dd35a.jpg",
    "Scorpio": "https://telegra.ph/file/1ac32965e723a693dd35a.jpg",
    "Sagittarius": "https://telegra.ph/file/1ac32965e723a693dd35a.jpg",
};

const handler = async (m, { usedPrefix, command, text }) => {
    if (!text) throw `مثال:\n${usedPrefix + command} سنة شهر يوم\n\n${usedPrefix + command} 2002 02 25`;

    const date = new Date(text);
    if (date == 'Invalid Date') throw date;
    const d = new Date();
    const [tahun, bulan, tanggal] = [d.getFullYear(), d.getMonth() + 1, d.getDate()];
    const birth = [date.getFullYear(), date.getMonth() + 1, date.getDate()];

    const zodiac = getZodiac(birth[1], birth[2]);
    const ageD = new Date(d - date);
    const age = ageD.getFullYear() - new Date(1970, 0, 1).getFullYear();

    const birthday = [tahun + (+new Date(1970, bulan - 1, tanggal) > +new Date(1970, birth[1] - 1, birth[2])), ...birth.slice(1)];
    const cekusia = bulan === birth[1] && tanggal === birth[2] ? `عيد ميلاد سعيد! عمرك الآن ${age} 🥳` : age;

    const nextBirthday = new Date(tahun, birth[1] - 1, birth[2]);
    nextBirthday.setFullYear(tahun + (nextBirthday < d));
    const timeUntilNextBirthday = nextBirthday - d - 7 * 60 * 60 * 1000;

    const daysUntilNextBirthday = Math.floor(timeUntilNextBirthday / (1000 * 60 * 60 * 24));
    const monthsUntilNextBirthday = Math.floor(daysUntilNextBirthday / 30);
    const hoursUntilNextBirthday = Math.floor(timeUntilNextBirthday / (1000 * 60 * 60));
    const minutesUntilNextBirthday = Math.floor((timeUntilNextBirthday % (1000 * 60 * 60)) / (1000 * 60));
    const secondsUntilNextBirthday = Math.floor((timeUntilNextBirthday % (1000 * 60)) / 1000);

    const newTime = new Date(d.getTime() + 7 * 60 * 60 * 1000);
    const newHours = newTime.getHours();
    const newMinutes = newTime.getMinutes();
    const newSeconds = newTime.getSeconds();

    const WaktuSekarangReplit = `${newHours}:${newMinutes}:${newSeconds}`;

    let caption = `
📅 الميلاد: ${birth.join('-')}
🎉 عيد ميلادك: ${birthday.join('-')}
👶 العمر الحالي: ${cekusia} سنوات
🎂 عيد الميلاد القادم: ${cekusia + 1} سنوات
♈ البرج: ${zodiac}
🕰️ الوقت الحالي: ${WaktuSekarangReplit}
✨ باقي ${monthsUntilNextBirthday} شهر و ${daysUntilNextBirthday % 30} أيام على عيد ميلادك 🎂
⏳ ${hoursUntilNextBirthday} ساعة و ${minutesUntilNextBirthday} دقيقة و ${secondsUntilNextBirthday} ثانية حتى عيد ميلادك 🎉
`.trim();

    let image = zodiacImages[zodiac];

    await conn.sendFile(m.chat, image, 'image.jpg', caption, m);
};

handler.help = ['zodiac *2002 02 25*'];
handler.tags = ['tools'];
handler.command = /^(zodia[kc]|jodiak|برجي|rasibintang)$/i;

export default handler;
