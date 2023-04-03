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
          listGrupo:[],
          display:""
      }
  }  

  componentDidMount(){
    this.loadGrupo();
    this.checkGrupo();
  }

  loadGrupo(){
    axios.get(baseUrl + "/grupo/list")
    .then(res => {
      if(res.data.success){
        const data = res.data.data;
        this.setState({ listGrupo:data });
      }
      else{
          alert("Error web service");
      }
    })
    .catch(error => {
      alert("Error server " + error)
    });
  }

  checkGrupo(){
    axios.get(baseUrl + "/grupo/list")
    .then(res => {
      if(res.data.success){
        const data = res.data.data;
        if(data.length > 0){
            //alert('ok')
            this.setState({display: 'none'})
        }
        else{
          alert('Adicione um controle para grupos')
        }
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
      <table className="table table-hover table-striped">
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Status</th>
            <th scope="col">Editar</th>
            <th scope="col">Deletar</th>
          </tr>
        </thead>
        <tbody>
          {this.loadFillData()}
        </tbody>
        <br></br>
        <span role="img" aria-label="warning">⚠️ Adicione apenas controlador</span>
        <br></br>
        <hr></hr>
        <Link style={{display:this.state.display}} className="btn btn-info " to="/formGrupo">Adicionar Controle</Link>
        <br></br>
        <br></br>
      </table>

      </div>
    );
  }

  loadFillData(){
    return this.state.listGrupo.map((data)=>{
        return(
          <tr>
            <th>{data.id}</th>
            <td>{data.status}</td>
            <td>
              <Link className="btn btn-outline-info" to={"/editGrupo/"+data.id}>Editar</Link>
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
    axios.post(baseUrl + "/grupo/delete",{
      id:userId
    })
    .then(response =>{
      if (response.data.success) {
        Swal.fire(
          'Deletado!',
          'Sua pergunta foi removida.',
          'success'
        )
        this.loadGrupo();
      }
    })
    .catch ( error => {
      alert("Error 325 ")
    })
  }

}

export default listComponent;