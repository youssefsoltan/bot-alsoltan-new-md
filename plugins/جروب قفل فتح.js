let handler = async (m, { conn, args, usedPrefix, command }) => {
  const pp ='https://telegra.ph/file/ec15edb7e6568daafc093.png'
  const fakecontact = { 'key': { 'participants': '0@s.whatsapp.net', 'remoteJid': 'status@broadcast', 'fromMe': false, 'id': '𝐒𝐇𝐀𝐖𝐀𝐙𝐀-𝐁𝐎𝐓' }, 'message': { 'contactMessage': { 'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` } }, 'participant': '0@s.whatsapp.net' };
  let isClose = { // Switch Case Like :v
      'فتح': 'not_announcement',
      'قفل': 'announcement',
  }[(args[0] || '')]
  if (isClose === undefined)
      return conn.sendButton(
      m.chat,
      'اخـتـر مـن الازرار لـلتحكـم فـي الـمجموعـه', 
      'بوت السلطان',
      pp,
      [
        ['فـتح المـجموعـه ', `${usedPrefix + command} فتح`],
        ['اغـلاق الـمجمـوعه ', `${usedPrefix + command} قفل`],
      ],
      { quoted: fakecontact }
    );
  await conn.groupSettingUpdate(m.chat, isClose)
}
handler.help = ['group *open/close*']
handler.tags = ['group']
handler.command = ['group', 'جروب','room'] 
handler.admin = true
handler.botAdmin = true

export default handler
