import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `*هذا الأمر يقوم بإنشاء صور من المطالبات النصية*\n\n*مثال*\n*◉ ${usedPrefix + command} anime Sukuna*\n*◉ ${usedPrefix + command} anime cat*`;

  try {
    m.reply('*الرجاء الانتظار، جاري إنشاء الصور...*');

    const apiKey = 'sk-proj-mgjXcRDD15i4IcSovoeiT3BlbkFJNDrKzjZ7PmZkv73oOtyE'; // استبدل هذا بالقيمة الصحيحة لمفتاح OpenAI API الخاص بك
    const endpoint = 'https://api.openai.com/v1/images/generations';

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'image-alpha-001',
        prompt: text,
        num_images: 1,
        size: '512x512'
      })
    });

    if (response.ok) {
      const data = await response.json();
      const imageUrl = data.data[0].url;
      await conn.sendFile(m.chat, imageUrl, 'image.png', null, m);
    } else {
      const errorData = await response.json();
      console.error('Error generating image:', errorData);
      throw '*فشل في إنشاء الصورة*';
    }
  } catch (error) {
    console.error('Error:', error);
    throw '*أوه، حدث خطأ ما أثناء إنشاء الصورة. الرجاء المحاولة مرة أخرى في وقت لاحق.*';
  }
};

handler.help = ['dalle'];
handler.tags = ['AI'];
handler.command = ['dalle', 'ارسم', 'تخيل', 'openai2'];
export default handler;
