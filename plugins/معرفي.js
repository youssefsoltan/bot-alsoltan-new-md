import { prepareWAMessageMedia, generateWAMessageFromContent, getDevice } from '@whiskeysockets/baileys';

let handler = async (m, { conn, usedPrefix, text, command }) => {
    let waLin = ''
  if (text) {
    waLin = text.replace(/[^0-9]/g, '')
  } else if (m.quoted) {
    waLin = m.quoted.sender.replace(/[^0-9]/g, '')
  } else if (m.mentionedJid && m.mentionedJid[0]) {
    waLin = m.mentionedJid[0].replace(/[^0-9]/g, '')
  } else {
    throw `قـم مـنـشـن او ريـبـلـاي عـلـي رسـالـة الـشـخـص او ضـع الـرقـم`
  }

  
  const waLink = `https://wa.me/${waLin}@s.whatsapp.net`
  const message = `*WhatsApp Link:*\n${waLink}`
  
let msg = generateWAMessageFromContent(m.chat, {
      viewOnceMessage: {
        message: {
          interactiveMessage: {
            body: { text:'انـسـخ الـرابـط مــن الـزر' },
            footer: { text: 'بوت السلطان' },
            header: {
              hasMediaAttachment: false,
            },
            nativeFlowMessage: {
              buttons: [              
                {
                 name: 'cta_copy',
                  buttonParamsJson: JSON.stringify({
                  display_text: 'انسخ الرابط',   
                  id: `${waLink}`,
                  copy_code: `${waLink}`
                 })  
                }
             ],
           messageParamsJson:"",
            },
          },
        },
      }
},{userJid:conn.user.jid,quoted:m});
  await conn.relayMessage (m.chat,msg.message, {messageId:msg.key.id});
  //conn.sendMessage(m.chat, { text: message, quoted: m, contextInfo: { mentionedJid: [m.sender] } })

  await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })

}

handler.help = ['wa']
handler.tags = ['tools']
handler.command = ['لينكي','معرف','معرفي']

export default handler
