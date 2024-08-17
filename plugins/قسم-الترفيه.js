import fetch from 'node-fetch';




const handler = async (m, {conn, usedPrefix, usedPrefix: _p, __dirname, text, isPrems}) => {
  const datas = global
  const idioma = datas.db.data.users[m.sender].language
  const _translate = JSON.parse(fs.readFileSync(`./language/${idioma}.json`))
  const tradutor = _translate.plugins.menu_audios

  try {
    const pp = imagen4;
    // let vn = './media/menu.mp3'
    const img = './Menu2.jpg';
    const d = new Date(new Date + 3600000);
    const locale = 'ar';
    const week = d.toLocaleDateString(locale, {weekday: 'long'});
    const date = d.toLocaleDateString(locale, {day: 'numeric', month: 'long', year: 'numeric'});
    const _uptime = process.uptime() * 1000;
    const uptime = clockString(_uptime);
    const user = global.db.data.users[m.sender];
    const {money, joincount} = global.db.data.users[m.sender];
    const {exp, limit, level, role} = global.db.data.users[m.sender];
    const rtotalreg = Object.values(global.db.data.users).filter((user) => user.registered == true).length;
    const more = String.fromCharCode(8206);
    const readMore = more.repeat(850);
    const taguser = '@' + m.sender.split('@s.whatsapp.net')[0];
    const doc = ['pdf', 'zip', 'vnd.openxmlformats-officedocument.presentationml.presentation', 'vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'vnd.openxmlformats-officedocument.wordprocessingml.document'];
    const document = doc[Math.floor(Math.random() * doc.length)];
    const str = `
╮──────﹝🛸﹞─────╭ـ
*│• بــسـم الـلـهُّ الـرحـمـن الـرحـيـم*
*│• اهلا ${taguser}*
*│• قـسـم الـترفـيه🛸✬⃝*
╯──────﹝🛸﹞─────╰ـ 
> *. صراحه*
*『البوت يسألك جاوب بالحقيقه』*
> *. قتل*
*『قتل الشخص』*
> *. بوليس*
*『تصبح شرطي』*
> *. نوعيه*
*『يجيب لك نوعيه شخص لازم منشن』*
> *. صناعة*
*『تصنع الاشياء』*
> *. برجي*
*『تاريخ عيد ميلادك و برجك』*
> *. صفع*
*『يصفع لك شخص』*
> *. سلاحي*
*『نسبه بقائك في حرب』*
> *. الحب*
*『نسبه حبكو لازم منشن』*
> *. شاذ*
*『يظهر نسبه الشذوذ』*
> *. فزوره*
*『يعطيك فزوره』*
> *. عمري*
*『يخبرك كم عمرك』*
> *. وفاتي*
*『يعطيك تاريخ وفاتك』*
> *. تطقيم*
*『تطقيم لشباب وبنات』*
> *. ايدت*
*『ايدت انمي حاًر』*
> *. ايديت-اغنيه*
*『يجيب لك ايدت اغاني』*
> *. دراغون-بول*
*『اديت لـدراغون بول』*
> *. عمل*
*『يعطيك وظيفه』*
> *. اسئلني*
*『البوت يسألك』*
> *. شخصيه*
*『يعطيك تفاصيل شخصيه』*
> *. فيك*
*『ريبلاي وهمي لشخص』*
> *. ميمز*
*『يعطيك ميمز』*
> *. اختبرني*
*『البوت يختبرك』*
> *. خروف*
*『خروف المجموعه』*
> *. اتحداك*
*『البوت يتحداك』*
> *. قلب*
*『لعبه جميله』*
> *. تهكير*
*『تهكير شخص』*
> *. نرد*
*『رمي النرد』*
> *. لو*
*『لو خيروك』*
> *. صداقه*
*『الصداقه حلوه』*
> *. بيحبني*
*『مين بيحبك』*
> *. بيكرهني*
*『مين بيكرهك』*
> *. حب*
*『الحب』*
> *. حساب*
*『معلومات حساب شخص』*
> *. هل*
*『اسأل البوت ويجاوبك』*
> *. ترجم*
*『ترجمه نص』*
> *. اقتباس*
*『اقتباس عشوائي』*
> *. زوجني*
*『البوت يزوجك لشخص』*
> *. زواج*
*『يزوج اتنين عشوائي』*
> *. طلاق*
*『يطلق اتنين عشوائي』*
> *. انطق*
*『ينطق النص』*
> *. تاج*
*『لعبه تاج』*
> *. حكمه*
*『يعطيك حكمه』*
> *. سؤال*
*『البوت يسألك』*
> *. استماره*
*『يرسل استماره دخول』*
> *. بوست*
*『بوست عشوائي』*
*╯─────────────────╰*`.trim();
    if (m.isGroup) {
      // await conn.sendFile(m.chat, vn, 'menu.mp3', null, m, true, { type: 'audioMessage', ptt: true})
      const fkontak2 = {'key': {'participants': '0@s.whatsapp.net', 'remoteJid': 'status@broadcast', 'fromMe': false, 'id': 'Halo'}, 'message': {'contactMessage': {'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`}}, 'participant': '0@s.whatsapp.net'};
      conn.sendMessage(m.chat, {image: pp, caption: str.trim(), mentions: [...str.matchAll(/@([0-9]{5,16}|0)/g)].map((v) => v[1] + '@s.whatsapp.net')}, {quoted: fkontak2});
    } else {
      // await conn.sendFile(m.chat, vn, 'menu.mp3', null, m, true, { type: 'audioMessage', ptt: true})
      const fkontak2 = {'key': {'participants': '0@s.whatsapp.net', 'remoteJid': 'status@broadcast', 'fromMe': false, 'id': 'Halo'}, 'message': {'contactMessage': {'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`}}, 'participant': '0@s.whatsapp.net'};
      conn.sendMessage(m.chat, {image: pp, caption: str.trim(), mentions: [...str.matchAll(/@([0-9]{5,16}|0)/g)].map((v) => v[1] + '@s.whatsapp.net')}, {quoted: fkontak2});
    }
  } catch {
    conn.reply(m.chat, tradutor.texto2, m);
  }
};
handler.command = /^(قسم-الترفيه|keyaudio|krk|jrn|jdj|bjjk|jdkn|memuaudio|audios|keyaudio|keyaudios)$/i;
handler.exp = 50;
handler.fail = null;
export default handler;
function clockString(ms) {
  const h = isNaN(ms) ? '--' : Math.floor(ms / 3600000);
  const m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60;
  const s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60;
  return [h, m, s].map((v) => v.toString().padStart(2, 0)).join(':');
}
