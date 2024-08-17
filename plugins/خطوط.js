import cheerio from 'cheerio';
import fetch from 'node-fetch';
import mime from 'mime-types';

let handler = async (m, { conn, args, usedPrefix, text, command }) => {

    let lister = [
        "بحث",
        "تحميل"
    ];

    let [feature, inputs, inputs_, inputs__, inputs___] = text.split(" ");
    if (!lister.includes(feature)) return m.reply("*مثال:*\n.خطوط بحث Arabic\n.خطوط تحميل https://www.dafont.com/arabica.font\n\n*يرجى تحديد نوع متاح*\n" + lister.map((v, index) => "  ○ " + v).join("\n"));

    if (lister.includes(feature)) {

        if (feature == "بحث") {
            if (!inputs) return m.reply("أدخل رابط الاستعلام\nمثال: .خطوط بحث|عربي");
            await m.reply(wait);
            try {
                let res = await searchDafont(inputs);
                let teks = res.map((item, index) => {
                    return `🔍 *[ نتيجة ${index + 1} ]*

📰 *العنوان:* ${item.title}
🔗 *الرابط:* ${item.link}
📌 *الموضوع:* ${item.theme}
🏷️ *رابط الموضوع:* ${item.themeLink}
👤 *اسم الكاتب:* ${item.author}
🔗 *رابط الكاتب:* ${item.authorLink}
🔢 *إجمالي التنزيلات:* ${formatNumber(item.totalDownloads)}
🖼️ *صورة معاينة:* ${item.previewImage}`;

                }).filter(v => v).join("\n\n________________________\n\n");
                await m.reply(teks);
            } catch (e) {
                await m.reply(eror);
            }
        }

        if (feature == "تحميل") {
            if (!inputs) return m.reply("أدخل رابط الاستعلام\nمثال: .dafonts تحميل|رابط");
            try {
                let item = await downloadDafont(inputs);
                let cap = '🔍 *[ نتيجة ]*\n\n📰 *العنوان:* ' + item.title +
          '\n👤 *الكاتب:* ' + item.author +
          '\n📌 *الموضوع:* ' + item.theme +
          '\n🔢 *إجمالي التنزيلات:* ' + formatNumber(item.totalDownloads) +
          '\n📁 *الملفات:*\n' + item.filename.map((e, i) => '   ' + (i + 1) + '. \'' + e + '\'').join('\n') +
          '\n🖼️ *صورة:* ' + item.image +
          '\n📝 *ملاحظة:* ' + item.note.replace(/(ملاحظة من الكاتب)(.*)/, '$1\n$2') +
          '\n⬇️ *تحميل:* ' + item.download;
          let details = await getFileDetails(item.download);
          
                await conn.sendFile(m.chat, item.image, "", cap, m);
                await conn.sendFile(m.chat, item.download, item.title + details.fileFormat, null, m, true, {
                    quoted: m,
                    mimetype: details.mimeType
                });
                
            } catch (e) {
                await m.reply(eror);
            }
        }
    }
};

handler.help = ["dafonts"];
handler.tags = ["الإنترنت"];
handler.command = /^(dafonts|خطوط)$/i;
export default handler;

/* سطر جديد */
async function searchDafont(q) {
  const response = await fetch(`https://www.dafont.com/search.php?q=${q}`);
  const html = await response.text();
  const $ = cheerio.load(html);

  const results = [];

  const regex = /<div class="lv1left dfbg">.*?<span class="highlight">(.*?)<\/span>.*?by <a href="(.*?)">(.*?)<\/a>.*?<\/div>.*?<div class="lv1right dfbg">.*?<a href="(.*?)">(.*?)<\/a>.*?>(.*?)<\/a>.*?<\/div>.*?<div class="lv2right">.*?<span class="light">(.*?)<\/span>.*?<\/div>.*?<div style="background-image:url\((.*?)\)" class="preview">.*?<a href="(.*?)">/g;

  let match;
  while ((match = regex.exec(html)) !== null) {
    const [, title, authorLink, author, themeLink, theme, , totalDownloads, previewImage, link] = match;

    const result = {
      title: title.trim() || 'غير معروف',
      authorLink: `https://www.dafont.com/${authorLink.trim()}` || 'غير معروف',
      author: author.trim() || 'غير معروف',
      themeLink: `https://www.dafont.com/${themeLink.trim()}` || 'غير معروف',
      theme: theme.trim() || 'غير معروف',
      totalDownloads: totalDownloads.trim().replace(/[^0-9]/g, '') || 'غير معروف',
      previewImage: `https://www.dafont.com${previewImage.trim()}` || 'غير معروف',
      link: `https://www.dafont.com/${link.trim()}` || 'غير معروف',
    };

    results.push(result);
  }

  return results;
}

async function downloadDafont(link) {
  const response = await fetch(link);
  const html = await response.text();
  const $ = cheerio.load(html);

  const getValue = (selector) => $(selector).text().trim();
  const getFilenames = () => $('.filename').toArray().map(element => $(element).text().trim());
  const getImage = () => 'https://www.dafont.com' + $('.preview').css('background-image').replace(/^url\(["']?|['"]?\)$/g, '');
  const getDownloadLink = () => $('a.dl').attr('href') ? 'http:' + $('a.dl').attr('href') : '';

  return {
    title: getValue('.lv1left.dfbg strong'),
    author: getValue('.lv1left.dfbg a'),
    theme: getValue('.lv1right.dfbg a:last-child'),
    totalDownloads: getValue('.lv2right .light').replace(/\D/g, ''),
    filename: getFilenames(),
    image: getImage(),
    note: $('[style^="border-left"]').text().trim(),
    download: getDownloadLink(),
  };
}

async function getFileDetails(url) {
  const response = await fetch(url);
  const contentType = response.headers.get('content-type');
  const mimeType = mime.contentType(contentType);
  const extension = mime.extension(contentType);

  return {
    url: url,
    mimeType: await mimeType,
    fileFormat: '.' + await extension
  };
}

function formatNumber(num) {
  const suffixes = ['', 'k', 'M', 'B', 'T'];
  const numString = Math.abs(num).toString();
  const numDigits = numString.length;

  if (numDigits <= 3) {
    return numString;
  }

  const suffixIndex = Math.floor((numDigits - 1) / 3);
  let formattedNum = (num / Math.pow(1000, suffixIndex)).toFixed(1);
  
  // Remove decimal if the number is already rounded
  if (formattedNum.endsWith('.0')) {
    formattedNum = formattedNum.slice(0, -2);
  }

  return formattedNum + suffixes[suffixIndex];
}
