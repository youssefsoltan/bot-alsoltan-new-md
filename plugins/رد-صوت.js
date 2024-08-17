let handler = async (m, { conn, usedPrefix, __dirname, text, isPrems }) => {

    const vn = './media/قلبي.mp3';
  conn.sendPresenceUpdate('recording', m.chat);
  conn.sendMessage(m.chat, {audio: {url: vn}, ptt: true, mimetype: 'audio/mpeg', fileName: `deja de llorar.mp3`}, {quoted: m});
};

handler.help = ['notification']
handler.tags = ['notification']
handler.command = ['قلب ','قلبي'] 
handler.customPrefix = /^(قلب|قلبي)$/i;
handler.command = new RegExp;
export default handler
