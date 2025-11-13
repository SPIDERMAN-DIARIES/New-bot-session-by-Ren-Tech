import express from 'express';
import fs from 'fs';
import pino from 'pino';
import { makeWASocket, useMultiFileAuthState, delay, makeCacheableSignalKeyStore, Browsers, jidNormalizedUser } from '@whiskeysockets/baileys';
import { upload } from './mega.js';

const router = express.Router();

// Ensure the session directory exists
function removeFile(FilePath) {
    try {
        if (!fs.existsSync(FilePath)) return false;
        fs.rmSync(FilePath, { recursive: true, force: true });
    } catch (e) {
        console.error('Error removing file:', e);
    }
}

router.get('/', async (req, res) => {
    let num = req.query.number;
    let dirs = './' + (num || `session`);
    
    // Remove existing session if present
    await removeFile(dirs);

    let retryCount = 0;
    const MAX_RETRIES = 5;

    // Enhanced session initialization function
    async function initiateSession() {
      const { state, saveCreds } = await useMultiFileAuthState(dirs)
try {
      const Um4r719 = makeWASocket({
        printQRInTerminal: false,
        logger: pino({
          level: 'silent',
        }),
        browser: ['Ubuntu', 'Chrome', '20.0.04'],
        auth: state,
      });

            if (!Um4r719.authState.creds.registered) {
                await delay(2000);
                num = num.replace(/[^0-9]/g, '');
                const code = await Um4r719.requestPairingCode(num);
                if (!res.headersSent) {
                    console.log({ num, code });
                    await res.send({ code });
                }
            }

            Um4r719.ev.on('creds.update', saveCreds);

            Um4r719.ev.on("connection.update", async (s) => {
                const { connection, lastDisconnect } = s;

                if (connection === "open") {
                    await Um4r719.sendMessage(Um4r719.user.id, { text: `Generating your session wait a moment`});
                    console.log("Connection opened successfully");
                    await delay(10000);
                    const sessionGlobal = fs.readFileSync(dirs + '/creds.json');

                    // Helper to generate a random Mega file ID
                    function generateRandomId(length = 6, numberLength = 4) {
                        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                        let result = '';
                        for (let i = 0; i < length; i++) {
                            result += characters.charAt(Math.floor(Math.random() * characters.length));
                        }
                        const number = Math.floor(Math.random() * Math.pow(10, numberLength));
                        return `${result}${number}`;
                    }

                    // Upload session file to Mega
                    const megaUrl = await upload(fs.createReadStream(`${dirs}/creds.json`), `${generateRandomId()}.json`);

                    // Add "UMAR=" prefix to the session ID
                    let stringSession = `${megaUrl.replace('https://mega.nz/file/', 'trashcore~')}`;

                    // Send the session ID to the target number
                    await Um4r719.sendMessage(Um4r719.user.id, { text: stringSession });

                    // Send confirmation message
                    await Um4r719.sendMessage(Um4r719.user.id, { 
                        text: `HIE 𝚄𝚂𝙴𝚁😃
                        
╭─═━⌬━═─⊹⊱✦⊰⊹─═━⌬━═─ 
╎   『 𝐒𝐄𝐒𝐒𝐈𝐎𝐍 𝐂𝐎𝐍𝐍𝐄𝐂𝐓𝐄𝐃 』   
╎  ✦ 𝙴𝚂 𝚃𝙴𝙰𝙼 𝚃𝙴𝙲𝙷
╎  ✦  𝚁𝙴𝙽 𝚃𝙴𝙲𝙷
╰╴╴╴╴

▌   『 🔐 𝐒𝐄𝐋𝐄𝐂𝐓𝐄𝐃 𝐒𝐄𝐒𝐒𝐈𝐎𝐍 』   
▌  • Session ID:  
▌  ⛔ [𝙸𝚃𝚂 𝚄𝙿 𝚃𝙷𝙴𝚁𝙴 ] 

╔═
╟   『 𝐂𝐎𝐍𝐓𝐀𝐂𝐓 & 𝐒𝐔𝐏𝐏𝐎𝐑𝐓 』  
╟   👑𝙳𝙴𝚅-𝟷:  +1 (443) 245-2503
╟  👑  𝙳𝙴𝚅-𝟸: +263 71 872 8504
╟  💻 𝐑𝐞𝐩𝐨: https://github.com/SPIDERMAN-DIARIES/ES-TEAMS-X-REN-TECH
╟  📢 𝐖𝐚𝐂𝐡𝐚𝐧𝐧𝐞𝐥:

https://whatsapp.com/channel/0029VbBjwT52f3ELVPsK6V2K

https://whatsapp.com/channel/0029VajbiIfAjPXO45zG2i2c


╰  
✦⋅⋆⋅⋆⋅⋆⋅⋆⋅⋆⋅⋆⋅⋆⋅⋆⋅⋆⋅⋆⋅✦  
   𝐄𝐍𝐉𝐎𝐘 
✦⋅⋆⋅⋆⋅⋆⋅⋆⋅⋆⋅⋆⋅⋆⋅⋆⋅⋆⋅⋆⋅✦  
______________________________
★彡[ᴅᴏɴ'ᴛ ғᴏʀɢᴇᴛ ᴛᴏ sᴛᴀʀ ᴛʜᴇ ʀᴇᴘᴏ!]彡★

>  https://github.com/SPIDERMAN-DIARIES/ES-TEAMS-X-REN-TECH

🌹 𝗦𝗽𝗲𝗰𝗶𝗮𝗹 𝗔𝗰𝗸𝗻𝗼𝘄𝗹𝗲𝗱𝗴𝗲𝗺𝗲𝗻𝘁: 𝚃𝙾 𝙰𝙻𝙻 𝚄𝚂𝙴𝚁𝚂 𝙾𝙵 𝚃𝙷𝙸𝚂 𝙱𝙾𝚃🌹  

━━━━━━━━━━━━━━━━━━━`
                    });

                    // Clean up session after use
                    await delay(100);
                    removeFile(dirs);
                    process.exit(0);
                } else if (connection === 'close' && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode !== 401) {
                    console.log('Connection closed unexpectedly:', lastDisconnect.error);
                    retryCount++;

                    if (retryCount < MAX_RETRIES) {
                        console.log(`Retrying connection... Attempt ${retryCount}/${MAX_RETRIES}`);
                        await delay(10000);
                        initiateSession();
                    } else {
                        console.log('Max retries reached, stopping reconnection attempts.');
                        await res.status(500).send({ message: 'Unable to reconnect after multiple attempts.' });
                    }
                }
            });
        } catch (err) {
            console.error('Error initializing session:', err);
            if (!res.headersSent) {
                res.status(503).send({ code: 'Service Unavailable' });
            }
        }
    }

    await initiateSession();
});

// Ensure session cleanup on exit or uncaught exceptions
process.on('exit', () => {
    removeFile(dirs);
    console.log('Session file removed.');
});

// Catch uncaught errors and handle session cleanup
process.on('uncaughtException', (err) => {
    console.error('Uncaught exception:', err);
    removeFile(dirs);
    process.exit(1);  // Ensure the process exits with error
});

export default router;
