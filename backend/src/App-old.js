//import express
const express = require('express');
const app = express();
require("./bootstrap");
const db = require('../src/helpers/DbHelper')

//setting port
app.set('port', process.env.POST||process.env.PORT);

//Middlewares
app.use(express.json());

//cros json
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

async function insertDb(){
    const GetGrupo = await db.getGrupo();
    const GetWpp = await db.getWhatsApp();
    const GetLimite = await db.getLimite();
    const GetHorario = await db.getHorario();
    if (GetGrupo === false){
        await db.insertGrupo();
    }
    if (GetWpp === false){
        await db.insertWhatsApp();
    }
    if (GetLimite === false){
        await db.insertLimite();
    }
    if (GetHorario === false){
        await db.insertHorario();
    }
    await db.updateChatBot();
    await db.updateDialogFlowAudio();
    await db.updateDialogFlow();
    await db.updateN8N();
    await db.updateWhatsApp();
    await db.updateTag();
}

function delay(t, v) {
    return new Promise(function(resolve) { 
        setTimeout(resolve.bind(null, v), t)
    });
 }

delay(10000).then(function() {
    insertDb();
    console.log('© BOT-ZDG - DB Populado')
});

const tagRouters = require('./routes/TagRoute');
app.use('/tag', tagRouters);

const tagUserRouters = require('./routes/TagUserRoute');
app.use('/taguser', tagUserRouters);

const perguntasRouters = require('./routes/PerguntasRoute');
app.use('/perguntas', perguntasRouters);

const agendamentoRouters = require('./routes/AgendamentoRoute');
app.use('/agendamento', agendamentoRouters);

const agendaStatusRouters = require('./routes/AgendaStatusRoute');
app.use('/agenda', agendaStatusRouters);

const gruposStatusRouters = require('./routes/GruposStatusRoute');
app.use('/grupo', gruposStatusRouters);

const n8nRouters = require('./routes/N8NRoute');
app.use('/n8n', n8nRouters);

const dialogFlowRouters = require('./routes/DialogFlowRoute');
app.use('/dialogFlow', dialogFlowRouters);

const dialogFlowAudioRouters = require('./routes/DialogFlowAudioRoute');
app.use('/dialogFlowAudio', dialogFlowAudioRouters);

const chatBotRouters = require('./routes/ChatBotRoute');
app.use('/chatBot', chatBotRouters);

const horarioRouters = require('./routes/HorarioRoute');
app.use('/horario', horarioRouters);

const limiteRouters = require('./routes/LimiteRoute');
app.use('/limite', limiteRouters);

const protocoloRouters = require('./routes/ProtocoloRoute');
app.use('/protocolo', protocoloRouters);

const whatsAppRouters = require('./routes/WhatsAppRoute');
app.use('/whatsApp', whatsAppRouters);

app.use('/', (req, res) => {
    res.send("© BOT-ZDG - Olá, seja bem vindo a Comunidade ZDG.");
});

app.listen(app.get('port'), () => {
    console.log("© BOT-ZDG - Iniciando o Servidor");
});
