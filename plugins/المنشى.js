import fetch from 'node-fetch'
let handler = async (m, { conn, usedPrefix, text, args, command }) => {
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let pp = await conn.profilePictureUrl(who).catch(_ => thumbnailUrl.getRandom())
let name = await conn.getName(who)

  const sentMsg = await conn.sendContactArray(m.chat, [
    [nomorown, `${await conn.getName(nomorown + '@s.whatsapp.net')}`, `💌 مطور البوت `, `A ليس مشهور`, `bryhmrw27@gmail.com`, `🇾🇪Yemen`, `📍 https://www.youtube.com/@user-to2qq1ji1r`, `👤 Owner 𝑮𝑶𝑲𝑼 𝑩𝒐𝒕`],
    [`${conn.user.jid.split('@')[0]}`, `${await conn.getName(conn.user.jid)}`, `🎈 Whatsapp Bot`, `📵 Dont Spam`, `Nothing`, `Yemen 🇾🇪`, `📍 https://chat.whatsapp.com/EbzeqqSjqsMI2oDrjSdT3g`, `مجرد روبوت عادي يحتوي على خطأ في بعض الأحيان ☺`]
  ], fkontak)
  await conn.reply(m.chat,`مرحبا ${m.sender.split(`@`)[0]} هذا هو المالك الخاص بي، لا ترسل بريدًا عشوائيًا وإلا سأحظرك`, sentMsg, {
                mentions: [m.sender]
            })
}

handler.help = ['owner', 'creator']
handler.tags = ['info']

handler.command = /^(owner|المنشى|creator)$/i

export default handler
