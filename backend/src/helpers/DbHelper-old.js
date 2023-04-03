const mysql = require('mysql2/promise');

const createConnection = async () => {
	return await mysql.createConnection({
		host: process.env.DB_HOST,
		user: process.env.DB_USER,
		password: process.env.DB_PASS,
		database: process.env.DB_NAME
	});
}

function delay(t, v) {
	return new Promise(function(resolve) { 
		setTimeout(resolve.bind(null, v), t)
	});
}

const getGrupo = async () => {
	const connection = await createConnection();
	const [rows] = await connection.execute('SELECT * FROM statusgrupos');
	delay(10000).then(async function() {
		await connection.end();
		delay(500).then(async function() {
			connection.destroy();
			//console.log('© BOT-ZDG Conexão fechada')
		});
		//console.log('© BOT-ZDG Conexão fechada')
	});
	if (rows.length > 0) return true;
	return false;
}

const insertGrupo = async () => {
	const connection = await createConnection();
	const [rows] = await connection.execute("INSERT INTO `statusgrupos` (`id`, `status`, `createdAt`, `updatedAt`) VALUES (NULL, 'off', current_timestamp(), current_timestamp());");
	delay(10000).then(async function() {
		await connection.end();
		delay(500).then(async function() {
			connection.destroy();
			//console.log('© BOT-ZDG Conexão fechada')
		});
		//console.log('© BOT-ZDG Conexão fechada')
	});
	if (rows.length > 0) return true;
	return false;
}

const getWhatsApp = async () => {
	const connection = await createConnection();
	const [rows] = await connection.execute('SELECT * FROM agstatuswhatsapps');
	delay(10000).then(async function() {
		await connection.end();
		delay(500).then(async function() {
			connection.destroy();
			//console.log('© BOT-ZDG Conexão fechada')
		});
		//console.log('© BOT-ZDG Conexão fechada')
	});
	if (rows.length > 0) return true;
	return false;
}

const insertWhatsApp = async () => {
	const connection = await createConnection();
	const [rows] = await connection.execute("INSERT INTO `agstatuswhatsapps` (`id`, `status`, `createdAt`, `updatedAt`) VALUES (NULL, 'off', current_timestamp(), current_timestamp());");
	delay(10000).then(async function() {
		await connection.end();
		delay(500).then(async function() {
			connection.destroy();
			//console.log('© BOT-ZDG Conexão fechada')
		});
		//console.log('© BOT-ZDG Conexão fechada')
	});
	if (rows.length > 0) return true;
	return false;
}

const getHorario = async () => {
	const connection = await createConnection();
	const [rows] = await connection.execute('SELECT * FROM horariochatbots');
	delay(10000).then(async function() {
		await connection.end();
		delay(500).then(async function() {
			connection.destroy();
			//console.log('© BOT-ZDG Conexão fechada')
		});
		//console.log('© BOT-ZDG Conexão fechada')
	});
	if (rows.length > 0) return true;
	return false;
}

const insertHorario = async () => {
	const connection = await createConnection();
	const [rows] = await connection.execute("INSERT INTO `horariochatbots` (`id`, `inicio`, `termino`, `createdAt`, `updatedAt`) VALUES (NULL, '00:00:00', '23:58:00', '2022-06-01 00:28:37.000000', '2022-06-01 00:28:37.000000');");
	delay(10000).then(async function() {
		await connection.end();
		delay(500).then(async function() {
			connection.destroy();
			//console.log('© BOT-ZDG Conexão fechada')
		});
		//console.log('© BOT-ZDG Conexão fechada')
	});
	if (rows.length > 0) return true;
	return false;
}

const getLimite = async () => {
	const connection = await createConnection();
	const [rows] = await connection.execute('SELECT * FROM limiteconexoes');
	delay(10000).then(async function() {
		await connection.end();
		delay(500).then(async function() {
			connection.destroy();
			//console.log('© BOT-ZDG Conexão fechada')
		});
		//console.log('© BOT-ZDG Conexão fechada')
	});
	if (rows.length > 0) return true;
	return false;
}

const insertLimite = async () => {
	const connection = await createConnection();
	const [rows] = await connection.execute("INSERT INTO `limiteconexoes` (`id`, `whatsapp`, `user`, `createdAt`, `updatedAt`) VALUES (NULL, '3', '3', '2022-06-01 00:29:25.000000', '2022-06-01 00:29:25.000000');");
	delay(10000).then(async function() {
		await connection.end();
		delay(500).then(async function() {
			connection.destroy();
			//console.log('© BOT-ZDG Conexão fechada')
		});
		//console.log('© BOT-ZDG Conexão fechada')
	});
	if (rows.length > 0) return true;
	return false;
}


const updateChatBot = async () => {
	const connection = await createConnection();
	const [rows] = await connection.execute('INSERT INTO statuschatbots (msgFrom) SELECT number FROM Contacts t1 WHERE t1.number NOT IN (SELECT msgFrom FROM statuschatbots)');
	delay(10000).then(async function() {
		await connection.end();
		delay(500).then(async function() {
			connection.destroy();
			//console.log('© BOT-ZDG Conexão fechada')
		});
		//console.log('© BOT-ZDG Conexão fechada')
	});
	if (rows.length > 0) return true;
	return false;
}

const updateDialogFlowAudio = async () => {
	const connection = await createConnection();
	const [rows] = await connection.execute('INSERT INTO dialogFlowaudios (msgFrom) SELECT number FROM Contacts t1 WHERE t1.number NOT IN (SELECT msgFrom FROM dialogFlowaudios)');
	delay(10000).then(async function() {
		await connection.end();
		delay(500).then(async function() {
			connection.destroy();
			//console.log('© BOT-ZDG Conexão fechada')
		});
		//console.log('© BOT-ZDG Conexão fechada')
	});
	if (rows.length > 0) return true;
	return false;
}

const updateDialogFlow = async () => {
	const connection = await createConnection();
	const [rows] = await connection.execute('INSERT INTO dialogFlows (msgFrom) SELECT number FROM Contacts t1 WHERE t1.number NOT IN (SELECT msgFrom FROM dialogFlows)');
	delay(10000).then(async function() {
		await connection.end();
		delay(500).then(async function() {
			connection.destroy();
			//console.log('© BOT-ZDG Conexão fechada')
		});
		//console.log('© BOT-ZDG Conexão fechada')
	});
	if (rows.length > 0) return true;
	return false;
}

const updateN8N = async () => {
	const connection = await createConnection();
	const [rows] = await connection.execute('INSERT INTO n8ns (msgFrom) SELECT number FROM Contacts t1 WHERE t1.number NOT IN (SELECT msgFrom FROM n8ns)');
	delay(10000).then(async function() {
		await connection.end();
		delay(500).then(async function() {
			connection.destroy();
			//console.log('© BOT-ZDG Conexão fechada')
		});
		//console.log('© BOT-ZDG Conexão fechada')
	});
	if (rows.length > 0) return true;
	return false;
}

const updateTag = async () => {
	const connection = await createConnection();
	const [rows] = await connection.execute('INSERT INTO tagcontacts (usuario) SELECT number FROM Contacts t1 WHERE t1.number NOT IN (SELECT usuario FROM tagcontacts)');
	delay(10000).then(async function() {
		await connection.end();
		delay(500).then(async function() {
			connection.destroy();
			//console.log('© BOT-ZDG Conexão fechada')
		});
		//console.log('© BOT-ZDG Conexão fechada')
	});
	if (rows.length > 0) return true;
	return false;
}

const updateWhatsApp = async () => {
	const connection = await createConnection();
	const [rows] = await connection.execute('INSERT INTO statuswhatsapps (nome, idWhaticket) SELECT name, id FROM Whatsapps t1 WHERE t1.id NOT IN (SELECT idWhaticket FROM statuswhatsapps)');
	delay(10000).then(async function() {
		await connection.end();
		delay(500).then(async function() {
			connection.destroy();
			//console.log('© BOT-ZDG Conexão fechada')
		});
		//console.log('© BOT-ZDG Conexão fechada')
	});
	if (rows.length > 0) return true;
	return false;
}


module.exports = {
	insertGrupo,
	insertWhatsApp,
	insertHorario,
	insertLimite,
	updateChatBot,
	updateDialogFlowAudio,
	updateDialogFlow,
	updateN8N,
	updateWhatsApp,
	getGrupo,
	getHorario,
	getLimite,
	getWhatsApp,
	updateTag
}