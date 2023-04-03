import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios';

import { Link } from 'react-router-dom';

//sweetalert2
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

const baseUrl = process.env.REACT_APP_BACKEND_URL;

class listComponent extends React.Component  {
  
  constructor(props){
      super(props);
      this.state = {
          listChatBot:[]
      }
  }  

  componentDidMount(){
    this.loadChatBot();
  }

  loadChatBot(){
    axios.get(baseUrl + "/chatBot/list")
    .then(res => {
      if(res.data.success){
        const data = res.data.data;
        this.setState({ listChatBot:data });
      }
      else{
          alert("Error web service");
      }
    })
    .catch(error => {
      alert("Error server " + error)
    });
  }
    
  render()
  {
    return (
      <div>
      <br></br>
      <span role="img" aria-label="warning">⚠️ Tela de controle manual do Chatbot via MySQL</span>
      <br></br>
      <hr></hr>
      <table className="table table-hover table-striped">
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Status</th>
            <th scope="col">Usuário</th>
            <th scope="col">Editar</th>
            <th scope="col">Deletar</th>
          </tr>
        </thead>
        <tbody>
          {/* <tr>
            <th>1</th>
            <td>Admin</td>
            <td>John Smitth</td>
            <td>jhonsmith@mail.com</td>
            <td>California</td>
            <td>317785847</td>
            <td>
              <button className="btn btn-outline-info "> Edit </button>
            </td>
            <td>
              <button className="btn btn-outline-danger "> Delete </button>
            </td>
          </tr> */}
          {this.loadFillData()}
        </tbody>
      </table>
      </div>
    );
  }

  loadFillData(){
    return this.state.listChatBot.map((data)=>{
        return(
          <tr>
            <th>{data.id}</th>
            <td>{data.status}</td>
            <td>{data.msgFrom}</td>
            <td>
              <Link className="btn btn-outline-info" to={"/editChatBot/"+data.id}>Editar</Link>
            </td>
            <td>
              <button className="btn btn-outline-danger" onClick={()=>this.onDelete(data.id)}>Deletar </button>
            </td>
          </tr>
        )
      });
  }

  onDelete(id){
    Swal.fire({
      title: 'Você tem certeza?',
      text: 'O dado não poderá ser recuperado ' + id,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, eu quero deletar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.sendDelete(id)
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelado',
          'Seu arquivo está a salvo :)',
          'error'
        )
      }
    })
  }

  sendDelete(userId)
  {
    // network
    axios.post(baseUrl + "/chatBot/delete",{
      id:userId
    })
    .then(response =>{
      if (response.data.success) {
        Swal.fire(
          'Deletado!',
          'Sua pergunta foi removida.',
          'success'
        )
        this.loadChatBot();
      }
    })
    .catch ( error => {
      alert("Error 325 ")
    })
  }

}

export default listComponent;