import fetch from 'node-fetch'
import fs from 'fs'
import jimp from 'jimp'
let handler = async (m, { conn, usedPrefix, text, args, command }) => {
let wm = '◄⏤͟͟͞  𝑌𝛩𝑈𝑺𝑺𝐸𝐹 ⸙ 𝐴𝐿 𝑺𝛩𝐿𝑇𝐴𝑁᪳𝆺꯭𝅥⎯꯭'
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let ftroli = { key: { remoteJid: 'status@broadcast', participant: '0@s.whatsapp.net' }, message: { orderMessage: { itemCount: 2023, status: 1, thumbnail: 'https://i.imgur.com/RbaRjrb.jpeg', surface: 1, message: wm, orderTitle: wm, sellerJid: '0@s.whatsapp.net' } } }
let bjir = 'https://telegra.ph/file/d21f45f70631e09dcae03.jpg'
let name = await conn.getName(who)

let delay = time => new Promise(res => setTimeout(res, time))
await conn.sendContact(m.chat, [[`201277272498` + `@s.whatsapp.net`, wm]], m, {
 contextInfo: { 
 forwardingScore: 2023,
isForwarded: false, 
 externalAdReply: {  
 title: '𝑇𝛨𝛯 𝐿𝛩𝛻𝛯𝐿𝑌 𝛩𝑊𝛮𝛯𝑅 𝛩𝐹', 
 body: ' 𝐵𝛩𝑇 𝐴𝐿 𝑺𝛩𝐿𝑇𝐴𝑁 ', 
 sourceUrl: 'https://whatsapp.com/channel/0029VaL2bnW0rGiPZq8B5S2M',
 thumbnail: 'https://telegra.ph/file/d21f45f70631e09dcae03.jpg',
 thumbnailUrl: 'https://telegra.ph/file/d21f45f70631e09dcae03.jpg', 
 mediaType: 1,
 showAdAttribution: true, 
 renderLargerThumbnail: true, 
 mentionedJid: [m.sender]
	}}}, { quoted: ftroli});

}
handler.help = ['owner', 'creator']
handler.tags = ['info']
handler.command = /^(المطور|مطور)$/i

export default handler


async function getBuffer(url) {
	return new Promise(async (resolve, reject) => {
		let buffer;
		await jimp
			.read(url)
			.then((image) => {
				image.getBuffer(image._originalMime, function (err, res) {
					buffer = res;
				});
			})
			.catch(reject);
		if (!Buffer.isBuffer(buffer)) reject(false);
		resolve(buffer);
	});
}
