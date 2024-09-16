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
  ╮──────﹝🃏﹞─────╭ـ
*│• بــسـم الـلـهُّ الـرحـمـن الـرحـيـم*
*│• اهلا ${taguser}*
*│• قـسـم الـتحويـل🪄✬⃝*
╯──────﹝🃏﹞─────╰ـ 
> *. ملصق*
*『يحول اي صوره الي ملصق』*
> *. دمج*
*『دمج ايموجي في ملصق』*
> *. لصوتي*
*『يحول اي مقطع صوتي او فيديو الي تسجيل صوتي』*
> *. تشفير*
*『لتشفير النص』*
> *. فك-شفرة*
*『لفك تشفير النص』*
> *. تعديل*
*『ادوات لتعديل علي الصور』*
> *. معرف*
*『يعطيك رابط رقمك』*
> *. تعليق*
*『يصبح ما تكتبه تعليق يوتيوب』*
> *. فضح*
*『يظهر الرساله المرسله عرض مره واحده』*
> *. بريد*
*『لأنشاء بريد وهمي』*
> *. رقم*
*『لأنشاء رقم وهمي』*
> *. نسخ*
*『نسخ النص من الصورة』*
> *. التوقيت*
*『يعطيك توقيت الدول』*
> *. اسمنينجا*
*『يعطيك اسمك بالغه النينجا』*
> *. تخيل*
*『يصنع صور من تخيلك』*
> *. شعار*
*『يصنع شعار لك عشوائي』*
> *. ستك*
*『يصنع ملصق مضئ بأسمك』*
> *. خط-عربي*
*『زخرفه خط عربي』*
> *. صورهai*
*『يصنع صور بالذكاء الاصطناعي』*
> *. مطلوب*
*『فلتر لأي صوره مطلوب』*
> *. رابطي*
*『يصنع رابط لرقمك』*
> *. كلمات-اغنيه*
*『يرسل لك اي كلمات اغنيه』*
> *. جوده*
*『يحسن جوده الصور』*
> *. سرقة*
*『لتغير حقوق اي ملصق』*
> *. تصميم*
*『يصنع لوجو بأسمك』*
> *. لوجو-ناروتو*
*『يصنع لوجو ناروتو بأسمك』*
> *. لفيديو*
*『يحول اي ملصق متحرك الي فيديو』*
> *. لصورة*
*『يحول الملصق الي صوره』*
> *. لانمي*
*『يحول الصوره الي انمي』*
> *. مكس*
*『يصنع ملصق مدمج بألاموجي』*
> *. تليجراف*
*『يصنع رابط للصوره』*
> *. لكرتون*
*『تحويل الصوره الي كرتون』*
> *. باركود*
*『يصنع Qr للنص』*
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
handler.command = /^(قسم-التحويل|keyaudio|krk|jrn|jdj|bjjk|jdkn|memuaudio|audios|keyaudio|keyaudios)$/i;
handler.exp = 50;
handler.fail = null;
export default handler;
function clockString(ms) {
  const h = isNaN(ms) ? '--' : Math.floor(ms / 3600000);
  const m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60;
  const s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60;
  return [h, m, s].map((v) => v.toString().padStart(2, 0)).join(':');
      }
