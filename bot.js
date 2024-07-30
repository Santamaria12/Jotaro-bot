const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const mongoose = require('mongoose');

// Conexión a la base de datos
mongoose.connect('mongodb://localhost:27017/whatsapp-bot', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Esquema de usuario
const userSchema = new mongoose.Schema({
    id: String,
    experience: Number,
    money: Number
});

const User = mongoose.model('User', userSchema);

const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Bot is ready!');
});

client.on('message', async msg => {
    if (msg.body === '#menu') {
        msg.reply('Bienvenido al menú de Rononoa Zoro Bot. Aquí puedes ver tus opciones: \n1. Jugar minijuegos \n2. Ver tu perfil \n3. Comprar ítems \n4. Ver el top de millonarios');
    }

    if (msg.body.startsWith('#jugar')) {
        // Lógica para minijuegos
        let user = await User.findOne({ id: msg.from });
        if (!user) {
            user = new User({ id: msg.from, experience: 0, money: 0 });
        }
        user.experience += 10; // Ejemplo de ganar experiencia
        await user.save();
        msg.reply(`Has ganado 10 puntos de experiencia. Tu experiencia total es: ${user.experience}`);
    }

    // Más comandos y lógica aquí...
});

client.initialize();


const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const mongoose = require('mongoose');
const axios = require('axios');
const fs = require('fs');

// Conexión a la base de datos
mongoose.connect('mongodb://localhost:27017/whatsapp-bot', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Esquema de usuario
const userSchema = new mongoose.Schema({
    id: String,
    experience: Number,
    money: Number
});

const User = mongoose.model('User', userSchema);

const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Bot is ready!');
});

client.on('message', async msg => {
    if (msg.body === '#menu') {
        const media = MessageMedia.fromFilePath('./images/zoro.jpg');
        await client.sendMessage(msg.from, media, { caption: 'Bienvenido al menú de Rononoa Zoro Bot. Aquí puedes ver tus opciones: \n1. Jugar minijuegos \n2. Ver tu perfil \n3. Comprar ítems \n4. Ver el top de millonarios' });
    }

    if (msg.body.startsWith('#jugar')) {
        // Lógica para minijuegos
        let user = await User.findOne({ id: msg.from });
        if (!user) {
            user = new User({ id: msg.from, experience: 0, money: 0 });
        }
        user.experience += 10; // Ejemplo de ganar experiencia
        await user.save();
        msg.reply(`Has ganado 10 puntos de experiencia. Tu experiencia total es: ${user.experience}`);
    }

    // Más comandos y lógica aquí...
});

client.on('group_join', async notification => {
    const media = MessageMedia.fromFilePath('./images/zoro_welcome.jpg');
    await client.sendMessage(notification.id.remote, media, { caption: '¡Bienvenido al grupo! Espero que disfrutes tu estancia. Aquí tienes una imagen de Zoro Roronoa.' });
});

client.on('group_leave', async notification => {
    const media = MessageMedia.fromFilePath('./images/zoro_goodbye.jpg');
    await client.sendMessage(notification.id.remote, media, { caption: '¡Hasta luego! Esperamos verte de nuevo. Aquí tienes una imagen de Zoro Roronoa.' });
});

client.initialize();

