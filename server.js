import TelegramBot from "node-telegram-bot-api";
import fs from "fs";
const KEY = "6233602285:AAE6gw64zAYBSd1IyFI0vZAl0RQdE2ZIH6c";
const bot = new TelegramBot(KEY, {
  polling: true,
});
let data = {};
let admin = 1373644960; 


bot.onText(/\/start/, async (msg) => {
  try {
    data = {};
    const id = msg.chat.id;
    data[id] = {
      first_name: msg.chat.first_name,
      steps: 0,
    };
    await bot.sendMessage(
      id,
      `Salom ${msg.chat.first_name}\nBu mening rasmiy kanalimning boti`
    );
    await bot.sendMessage(id, "Ism va familiyangizni kiriting!");
    data[id].steps = 1;
  } catch (error) {}
});
bot.on("text", (msg) => {
  if (msg.text == "/start") return;
  const id = msg.chat.id;
  if (data[id].steps == 1) {
    data[id]["stuff"] = {};
    data[id].stuff.name = msg.text;
    bot.sendMessage(
      id,
      `
        📚 Texnologiya:

Talab qilinadigan texnologiyalarni kiriting?
Texnologiya nomlarini vergul bilan ajrating. Masalan, 

Java, C++, C#
`
    );
    data[id].steps = 2;
    return;
  }
  if (data[id].steps == 2) {
    data[id].stuff.texnologiya = msg.text;
    data[id].steps = 3;

    bot.sendMessage(
      id,
      `
    📞 Aloqa: 

Boglanish uchun raqamingizni kiriting?
Masalan, +998 90 123 45 67`
    );
    return;
  }
  if (data[id].steps == 3) {
    data[id].stuff.contact = msg.text;
    data[id].steps = 4;
    bot.sendMessage(
      id,
      `
    🌐 Hudud: 

Qaysi hududdansiz?
Viloyat nomi, Toshkent shahar yoki Respublikani kiriting.`
    );
    return;
  }
  if (data[id].steps == 4) {
    data[id].stuff.place = msg.text;
    data[id].steps = 5;
    bot.sendMessage(
      id,
      `
    💰 Narxi:

Tolov qilasizmi yoki Tekinmi?
Kerak bolsa, Summani kiriting?`
    );

    return;
  }
  if (data[id].steps == 5) {
    data[id].stuff.price = msg.text;
    data[id].steps = 6;

    bot.sendMessage(
      id,
      `
    👨🏻‍💻 Kasbi: 

Ishlaysizmi yoki oqiysizmi?
Masalan, Talaba`
    );
    return;
  }
  if (data[id].steps == 6) {
    data[id].stuff.proffession = msg.text;
    data[id].steps = 7;
    bot.sendMessage(
      id,
      `
    🔎 Maqsad:

Maqsadingiz nima?
Masalan, Kop pul ishlash
    `
    );
    return;
  }
  if (data[id].steps == 7) {
    data[id].stuff.purpose = msg.text;
    data[id].steps = 8;
    bot.sendMessage(
      id,
      `
    🕰 Murojaat qilish vaqti: 

Qaysi vaqtda murojaat qilish mumkin?
Masalan, 9:00 - 18:00
    `
    );
    return;
  }
  if (data[id].steps == 8) {
    data[id].stuff.time = msg.text;
    data[id].steps = 9;
}
  if (data[id].steps == 9) {
    let caption = `${id}&
Sherik kerak:


🏅 Sherik: ${data[id].stuff.name}                        
📚 Texnologiya: ${data[id].stuff.texnologiya}            
📞 Aloqa: ${data[id].stuff.contact}                   
🌐 Hudud: ${data[id].stuff.place}                            
💰 Narxi: ${data[id].stuff.price}                                   
👨🏻‍💻 Kasbi: ${data[id].stuff.proffession} 
🕰 Murojaat qilish vaqti: ${data[id].stuff.time} 
🔎 Maqsad: ${data[id].stuff.purpose}




#sherik #${data[id].stuff.place} #${data[id].stuff.texnologiya}

<a href='https://t.me/galamaala'>Kanalga</a> obuna boling: 
`;

    bot.sendMessage(admin, caption, {
        parse_mode: 'HTML',
      reply_markup: {
        inline_keyboard: [
          [
            { text: "✅ Ha", callback_data: "ok" },
            { text: "🚫 Yoq", callback_data: "no" },
          ],
        ],
      },
    });
  }
});
bot.on('callback_query',  (msg) => {
    let [id, text] = msg.message.text.split('&');
    if(msg.message.chat.id == admin && msg.data == 'ok') {
        bot.sendMessage('@galamaala', text);
        bot.sendMessage(id, 'Sizning eloningiz kanalga yuborildi!')
    } else if(msg.message.chat.id == admin && msg.data == 'no') {
        bot.sendMessage(id, 'Sizning eloningiz kanalga yuborildmadi, iltimos hammanarsani tekshiring!', {
            
        })

    }
})