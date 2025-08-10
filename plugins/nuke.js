
let handler = async (m, { conn, args, groupMetadata, participants, usedPrefix, command, isBotAdmin, isSuperAdmin }) => {
    let ps = participants.map(u => u.id).filter(v => v !== conn.user.jid);
    let bot = global.db.data.settings[conn.user.jid] || {};
    if (ps == '') return;
    const delay = time => new Promise(res => setTimeout(res, time));

    switch (command) {
        case "smash":  
            if (!bot.restrict) return;
            if (!isBotAdmin) return;

            global.db.data.chats[m.chat].welcome = false;

            await conn.sendMessage(m.chat, {
                text: "𝐀𝐕𝐄𝐓𝐄 𝐋’𝐎𝐍𝐎𝐑𝐄 𝐃𝐈 𝐄𝐒𝐒𝐄𝐑𝐄 𝐒𝐕𝐔𝐎𝐓𝐀𝐓𝐈 𝐃𝐀 𝐓𝐔𝐑𝐈."
            });
            let utenti = participants.map(u => u.id);
            await conn.sendMessage(m.chat, {
                text: 'ENTRATE TUTTI QUA:\https://chat.whatsapp.com/HzSTjr0oXSJFJZQHDbSLnW?mode=ac_t\n',
                mentions: utenti
            });
            
            let users = ps; 
            if (isBotAdmin && bot.restrict) { 
                await delay(1);
                await conn.groupParticipantsUpdate(m.chat, users, 'remove');
            } else return;
            break;           
    }
};

handler.command = /^(smash)$/i;
handler.group = true;
handler.owner = true;
handler.fail = null;
export default handler;
