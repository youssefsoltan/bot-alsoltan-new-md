import cp, { exec as _exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';

const exec = promisify(_exec).bind(cp);
const LOCAL_REPO_DIR = './silana-bot';
const URL_FILE = './repo_url.txt';

const handler = async (m, { conn, isROwner, usedPrefix, command, text }) => {
  const updateRepo = async (url) => {
    if (!fs.existsSync(LOCAL_REPO_DIR)) {
      await exec(`git clone ${url} ${LOCAL_REPO_DIR}`);
    } else {
      await exec(`cd ${LOCAL_REPO_DIR} && git pull`);
    }
  };

  const handleAdd = async (url) => {
    if (!url) {
      return m.reply('يرجى إرسال رابط صالح بعد الأمر.');
    }
    fs.writeFileSync(URL_FILE, url);
    await updateRepo(url);
    m.reply('تم حفظ الرابط وتحديث الملفات بنجاح.');
  };

  const handleClear = () => {
    if (fs.existsSync(URL_FILE)) {
      fs.unlinkSync(URL_FILE);
      m.reply('تم حذف الرابط المحفوظ. يرجى إضافة رابط جديد باستخدام الأمر المناسب.');
    } else {
      m.reply('لا يوجد رابط محفوظ.');
    }
  };

  const handleShow = async (file) => {
    const url = fs.existsSync(URL_FILE) ? fs.readFileSync(URL_FILE, 'utf-8').trim() : null;
    if (!url) {
      return m.reply('لا يوجد رابط محفوظ. يرجى إضافة رابط جديد باستخدام الأمر المناسب.');
    }
    await updateRepo(url);
    const filePath = `${LOCAL_REPO_DIR}/plugins/${file}.js`;
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8');
      const aa = await conn.sendMessage(m.chat, { text: content }, { quoted: m });
      await conn.sendMessage(m.chat, { document: fs.readFileSync(filePath), mimetype: 'application/javascript', fileName: `${file}.js` }, { quoted: aa });
    } else {
      m.reply(`الملف "${file}" غير موجود.`);
    }
  };

  const ar = fs.existsSync(LOCAL_REPO_DIR) ? fs.readdirSync(`${LOCAL_REPO_DIR}/plugins`).filter(file => file.endsWith('.js')) : [];
  const ar1 = ar.map(v => v.replace('.js', ''));

  if (command === 'gpps') {
    return handleAdd(text);
  } else if (command === 'gppd') {
    return handleClear();
  } else if (command === 'gppv' && text) {
    return handleShow(text);
  } else if (!text) {
    const urlExists = fs.existsSync(URL_FILE) && fs.readFileSync(URL_FILE, 'utf-8').trim();
    if (!urlExists) {
      return m.reply('لا يوجد رابط محفوظ. يرجى إضافة رابط جديد باستخدام الأمر المناسب.');
    }
    throw `يرجى استخدام الأمر بشكل صحيح: ${usedPrefix + command} <اسم الملف>\n\nالملفات المتاحة:\n${ar1.map(v => ' ' + v).join`\n*◉*`}`;
  } else if (!ar1.includes(text)) {
    return m.reply(`الملف "${text}" غير موجود. الملفات المتاحة:\n${ar1.map(v => ' ' + v).join`\n*◉*`}`);
  } else {
    let o;
    try {
      o = await exec(`cat ${LOCAL_REPO_DIR}/plugins/${text}.js`);
    } catch (e) {
      o = e;
    } finally {
      const { stdout, stderr } = o;
      if (stdout.trim()) {
        const aa = await conn.sendMessage(m.chat, { text: stdout }, { quoted: m });
        await conn.sendMessage(m.chat, { document: fs.readFileSync(`${LOCAL_REPO_DIR}/plugins/${text}.js`), mimetype: 'application/javascript', fileName: `${text}.js` }, { quoted: aa });
      }
      if (stderr.trim()) {
        const aa2 = await conn.sendMessage(m.chat, { text: stderr }, { quoted: m });
        await conn.sendMessage(m.chat, { document: fs.readFileSync(`${LOCAL_REPO_DIR}/plugins/${text}.js`), mimetype: 'application/javascript', fileName: `${text}.js` }, { quoted: aa2 });
      }
    }
  }
};

handler.help = ['getplugin'].map(v => v + ' *<nombre>*');
handler.tags = ['owner'];
handler.command = /^(gpps|gppv|gppd)$/i;
handler.rowner = true;

export default handler;
