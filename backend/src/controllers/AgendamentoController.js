const controllers = {}

//import model and sequalize

var sequelize = require('../model/database');
var agendamento = require('../model/Agendamento');

sequelize.sync();

controllers.list = async (req, res) => {
    const data = await agendamento.findAll()
    .then(function(data){
        return data;
    })
    .catch(error => {
        return error;
    })

    res.json({
        success: true,
        data: data
    });
}

controllers.create = async(req, res) => {
    const {mensagem, destinatario, dataEnvio, horarioEnvio} = req.body;

    const data = await agendamento.create({
        mensagem:mensagem,
        destinatario:destinatario,
        dataEnvio:dataEnvio,
        horarioEnvio:horarioEnvio
    })
    .then(function(data){
        return data;
    })
    .catch(error=>{
        console.log(error);
        return error;
    })

    res.status(200).json({
        success: true,
        message: "Mensagem agendada com sucesso.",
        data: data
    })
}

controllers.get = async(req, res) => {
    const { id } = req.params;

    const data  = await agendamento.findAll({
        where: {id : id}
    })
    .then(function(data){
        return data;
    })
    .catch(error=>{
        console.log(error);
        return error;
    })

    res.json({
        success:true,
        data: data
    })
}

controllers.update = async (req,res) => {
    // parameter get id
    const { id } = req.params;
    // parameter POST
    const {mensagem, destinatario, dataEnvio, horarioEnvio } = req.body;
    // Update data
    const data = await agendamento.update({
        mensagem:mensagem,
        destinatario:destinatario,
        dataEnvio:dataEnvio,
        horarioEnvio:horarioEnvio
    },
    {
      where: { id: id}
    })
    .then( function(data){
      return data;
    })
    .catch(error => {
      return error;
    }) 
    res.json({success:true, data:data, message:"Agendamento atualizado com sucesso"});
  }

  controllers.delete = async (req, res) => {
    // parameter post
    const { id } = req.body;
    // delete sequelize
    const del = await agendamento.destroy({
      where: { id: id}
    })
    res.json({success:true,deleted:del,message:"Agendamento apagado com sucesso."});
  }

module.exports = controllers;