import axios from 'axios';
import fs from 'fs';
import path from 'path';
import os from 'os';

const linkFilePath = './projectLink.json'; // ملف لتخزين رابط المشروع

const downloadFileContent = async (url) => {
  try {
    const response = await axios.get(url, { responseType: 'text' });
    return response.data;
  } catch (error) {
    console.error('خطأ في جلب محتوى الملف:', error);
    throw error;
  }
};

const saveProjectLink = (link) => {
  fs.writeFileSync(linkFilePath, JSON.stringify({ link }));
};

const getProjectLink = () => {
  if (fs.existsSync(linkFilePath)) {
    return JSON.parse(fs.readFileSync(linkFilePath)).link;
  }
  return null;
};

const deleteProjectLink = () => {
  if (fs.existsSync(linkFilePath)) {
    fs.unlinkSync(linkFilePath);
  }
};

const getDefaultBranch = async (repoLink) => {
  const repoPath = repoLink.replace('https://github.com/', '').replace('.git', '');
  const apiUrl = `https://api.github.com/repos/${repoPath}`;
  
  try {
    const response = await axios.get(apiUrl);
    return response.data.default_branch || 'master'; // العودة إلى 'master' إذا لم يكن هناك فرع افتراضي
  } catch (error) {
    console.error('خطأ في جلب معلومات الفرع الافتراضي:', error);
    return 'master'; // قيمة افتراضية في حال حدوث خطأ
  }
};

const getFileUrl = (repoLink, fileName) => {
  const repoPath = repoLink.replace('https://github.com/', '').replace('.git', '');
  const defaultBranch = 'master'; // سيتم تحديثه باستخدام getDefaultBranch
  return `https://raw.githubusercontent.com/${repoPath}/${defaultBranch}/plugins/${fileName}`;
};

const handleFileDownloadAndSend = async (m, conn, fileUrl, fileName) => {
  let msg = await conn.sendMessage(m.chat, { text: 'جاري تحميل ومعالجة الملف، يرجى الانتظار...' }, { quoted: m });

  try {
    // تحميل محتوى الملف مباشرة من الرابط
    const fileContent = await downloadFileContent(fileUrl);

    // إرسال النص الموجود داخل الملف
    await conn.sendMessage(m.chat, { text: fileContent }, { quoted: m });

    // إنشاء مسار مؤقت للملف
    const tempFilePath = path.join(os.tmpdir(), fileName);

    // حفظ محتوى الملف في ملف مؤقت
    fs.writeFileSync(tempFilePath, fileContent);

    // إرسال الملف كمرفق باستخدام sendFile
    await conn.sendFile(m.chat, tempFilePath, fileName, '', m, { mimetype: 'application/javascript' });

    // حذف الملف المؤقت بعد الإرسال
    fs.unlinkSync(tempFilePath);

    // تحديث رسالة الانتظار
    await conn.sendMessage(m.chat, { text: 'تم تحميل الملف وإرساله بنجاح!' }, { quoted: m });

  } catch (error) {
    console.error('خطأ في تحميل أو معالجة الملف:', error);
    await conn.sendMessage(m.chat, { text: 'حدث خطأ أثناء تحميل أو معالجة الملف.' }, { quoted: m });
  }
};

const listFilesInRepo = async (repoLink) => {
  const repoPath = repoLink.replace('https://github.com/', '').replace('.git', '');
  const defaultBranch = await getDefaultBranch(repoLink);
  const apiUrl = `https://api.github.com/repos/${repoPath}/contents/plugins?ref=${defaultBranch}`;

  try {
    const response = await axios.get(apiUrl);
    return response.data.map(file => file.name); // الإبقاء على امتداد .js
  } catch (error) {
    console.error('خطأ في جلب قائمة الملفات:', error);
    return [];
  }
};

const formatFileList = (files) => {
  if (files.length === 0) {
    return 'لم يتم العثور على ملفات.';
  }
  
  const header = '╮──────────────────╭\n│\n╰──────────────────╯';
  const fileList = files.map((file, index) => `│ [${index + 1}] ${file}`).join('\n');
  return `${header}\n${fileList}\n${header}\nعدد الملفات المتاحة: ${files.length}`;
};

const handler = async (m, { conn, isROwner, usedPrefix, command, text }) => {
  if (command === 'res') {
    // أمر لتعيين رابط المشروع
    if (!text) return m.reply('يرجى تقديم رابط المشروع.');
    if (!text.startsWith('https://github.com/') || !text.endsWith('.git')) {
      return m.reply('الرابط يجب أن يكون رابط GitHub ينتهي بـ ".git".');
    }

    saveProjectLink(text);
    m.reply('تم حفظ رابط المشروع بنجاح.');

  } else if (command === 'rev') {
    // أمر لعرض الملفات من الرابط المخزن
    const projectLink = getProjectLink();
    if (!projectLink) {
      return m.reply(
        `لم يتم تعيين رابط مشروع بعد. يرجى تعيين الرابط باستخدام الأمر ${usedPrefix}res <رابط>\n` +
        `مثال: ${usedPrefix}res https://github.com/username/repo.git`
      );
    }

    const files = await listFilesInRepo(projectLink);

    if (!text) {
      // عرض قائمة الملفات إذا لم يتم إدخال اسم الملف
      return m.reply(formatFileList(files));
    } else {
      // عرض محتوى الملف إذا تم إدخال اسم الملف
      const fileNameWithExt = `${text}.js`; // التأكد من أن اسم الملف ينتهي بـ .js
      if (!files.includes(fileNameWithExt)) {
        return m.reply(`الملف "${fileNameWithExt}" غير موجود. القائمة المتاحة هي:\n${formatFileList(files)}`);
      }

      const fileUrl = getFileUrl(projectLink, fileNameWithExt);
        
      await handleFileDownloadAndSend(m, conn, fileUrl, fileNameWithExt);
    }

  } else if (command === 'red') {
    // أمر لحذف الرابط المخزن
    const projectLink = getProjectLink();
    if (projectLink) {
      deleteProjectLink();
      m.reply('تم حذف رابط المشروع.');
    } else {
      m.reply(
        `لم يتم تعيين رابط مشروع بعد. يرجى تعيين الرابط باستخدام الأمر ${usedPrefix}res <رابط>\n` +
        `مثال: ${usedPrefix}res https://github.com/username/repo.git`
      );
    }
  }
};

handler.help = [
  'res *<رابط>* - لتعيين رابط المشروع',
  'rev *<اسم ملف>* - لعرض محتوى ملف من رابط المشروع (أو عرض قائمة الملفات المتاحة إذا لم يتم تحديد اسم الملف)',
  'red - لحذف رابط المشروع'
];
handler.tags = ['owner'];
handler.command = /^(res|rev|red)$/i;
handler.rowner = true;

export default handler;
