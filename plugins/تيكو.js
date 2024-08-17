import axios from 'axios';
const { proto, generateWAMessageFromContent, generateWAMessageContent } = (await import("@whiskeysockets/baileys")).default;

let handler = async (message, { conn, text, usedPrefix, command }) => {
  await conn.sendMessage(message.chat, { react: { text: '❌', key: message.key } });

  if (!text) {
    return conn.reply(message.chat, `*╮┄╌〔 ≪ بوت السلطان ≫ 〕╌╌•*\n*┆❌ بتستخدم الامر غلط*\n*┆✔️ الاستخدام الصح*\n*┆❕ مثال: ${usedPrefix + command} استا*\n*╯────ׂ─ׂ─ׂ─ׂ─────╌─╌─╌*`, message);
  }

  async function createVideoMessage(url) {
    await conn.sendMessage(message.chat, { react: { text: '⏳', key: message.key } });
    const { videoMessage } = await generateWAMessageContent({ video: { url } }, { upload: conn.waUploadToServer });
    return videoMessage;
  }

  async function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  try {
    let results = [];
    let { data: response } = await axios.get('https://apis-starlights-team.koyeb.app/starlight/tiktoksearch?text=' + text);
    let searchResults = response.data;
    shuffleArray(searchResults);
    let selectedResults = searchResults.splice(0, 7);

    for (let result of selectedResults) {
      results.push({
        body: proto.Message.InteractiveMessage.Body.fromObject({ text: null }),
        footer: proto.Message.InteractiveMessage.Footer.fromObject({ text: wm }),
        header: proto.Message.InteractiveMessage.Header.fromObject({
          title: '' + result.title,
          hasMediaAttachment: true,
          videoMessage: await createVideoMessage(result.nowm),
        }),
        nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({ buttons: [] }),
      });
    }

    const responseMessage = generateWAMessageFromContent(message.chat, {
      viewOnceMessage: {
        message: {
          messageContextInfo: {
            deviceListMetadata: {},
            deviceListMetadataVersion: 2
          },
          interactiveMessage: proto.Message.InteractiveMessage.fromObject({
            body: proto.Message.InteractiveMessage.Body.create({
              text: `*╮┄╌〔 ≪ بوت السلطان ≫ 〕╌╌•*\n*┆✨ نتائج البحث عن: ${text}*\n*┆🔎 بحث تيك توك ...*\n*╯────ׂ─ׂ─ׂ─ׂ─────╌─╌─╌*`
            }),
            footer: proto.Message.InteractiveMessage.Footer.create({ text: '' }),
            header: proto.Message.InteractiveMessage.Header.create({ hasMediaAttachment: false }),
            carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({ cards: [...results] })
          })
        }
      }
    }, { quoted: message });

    await conn.relayMessage(message.chat, responseMessage.message, { messageId: responseMessage.key.id });
    await conn.sendMessage(message.chat, { react: { text: '✔️', key: message.key } });
  } catch (error) {
    await conn.reply(message.chat, error.toString(), message);
  }
}

handler.help = ['tiktoksearch <txt>'];
handler.tags = ['buscador'];
handler.command = ['tiktoksearch', 'tts', 'تيكو'];
export default handler;
