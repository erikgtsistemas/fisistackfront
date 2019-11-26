import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
import CONFIG from '../Configuracion/Config';
import {browserHistory} from 'react-router-3';
import Alumno from './Alumno';
import Select from 'react-select';


export default class Articulo extends React.Component{
    constructor(props){
        super(props);
        this.state={
            revistas: [],
            estados: [],
            alumno :[],
			alumnos :[],
			alumnobus :[],
			alumnodnibus :[],
            articulos : [],
			codautores : [],
			autores: [],
			pruebaa : [],
			tipo : 1,
			a:'',
			options:[{ value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }],
            modal: false
			, idarticulo :''
            , idestado: ''
            , idrevista: ''
            , titulo: ''
            , orcid: ''
            , doi: ''
            , linkar: ''
			, issn : ''
            , autor1: ''
            , autor2: ''
			, autor3 : ''
            , prueba1: ''
            , prueba2: ''
            , nombrere: ''
            , linkre: ''
            , indexacion: ''
            , linkin: ''
			, linkconf : ''
            , estadopu: ''
            , nestedModal: false
            , nestedModale: false
            , nombreconf : ''
            , estadoconf : ''
            , comconf : ''
            ,marca_temporal : Date.now()
            ,linkcyber : ''
            ,titulotesis : ''
            ,asesor : ''
			,codbus : ''
			,dnibus : ''
			,apynombus : '',
            closeAll: false
            , activeTab: '1'
            , codigo : this.props.params.name
			, hcrear :false
        };
    this.toggle = this.toggle.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeTeam = this.handleChangeTeam.bind(this);
    this.handleChangeCountry = this.handleChangeCountry.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleNested = this.toggleNested.bind(this);
    this.toggleNestede = this.toggleNestede.bind(this);
    this.toggleAll = this.toggleAll.bind(this);
    this.onChange = this.onChange.bind(this);
    this.togglet = this.togglet.bind(this);
    this.reloadRevista = this.reloadRevista.bind(this);
    this.reloadEstadoPublicacion = this.reloadEstadoPublicacion.bind(this);
    this.loadJournal = this.loadJournal.bind(this);
    this.reloadArticuloCientifico = this.reloadArticuloCientifico.bind(this);
    this.saveArticulo = this.saveArticulo.bind(this);
    this.saveRevista = this.saveRevista.bind(this);
    this.saveEstadoPublicacion = this.saveEstadoPublicacion.bind(this);
    this.editArticulo = this.editArticulo.bind(this);
    this.deleteArticulo = this.deleteArticulo.bind(this);
    this.Regresar = this.Regresar.bind(this);
	this.buscar= this.buscar.bind(this);
	this.ValidarNombre = this.ValidarNombre.bind(this);
	this.agregarautor = this.agregarautor.bind(this);
	this.pu=this.pu.bind(this);
    }
    
	pu(event){
		console.log(this.state.pruebaa.length)
		if(this.state.pruebaa.length <=3){
			var ini = this.state.pruebaa.length
			var p = this.state.pruebaa.filter((b)=>{
			  return  b !== event.target.value;
			})
			console.log(p)
			var fin = p.length
			if((fin - ini) ==0)  p.push(event.target.value);
			console.log(p)
			this.setState({
                pruebaa:p
            });
			console.log(this.state.pruebaa)
			console.log(this.state.pruebaa.length)
		}else{
			console.log("Ya se eligieron 3 autores")
		}
		
	}
    componentWillMount() {
        this.reloadRevista();
        this.reloadEstadoPublicacion();
        this.reloadArticuloCientifico();
        this.loadJournal();
		console.log(this.state.marca_temporal);
      }
     
	 agregarautor(){
		 if(this.state.tipo === 1){
			 if(this.state.codautores.length<3){
				 this.state.codautores.push(this.state.alumnobus.codigoAlumno)
				  console.log(this.state.codautores)
				  fetch(CONFIG + 'mse/alumno/buscar/'+this.state.alumnobus.codigoAlumno)
	              .then((response)=>{
		           return response.json()
		         })
		    .then((alumno) =>{
			 this.state.autores.push(alumno)
		 })
		 .catch((error) =>{
			 console.log(error)
		 })
		 console.log(this.state.autores)
			 }else{
				 console.log("ya se registraron 3 autores")
			 }
		 }else if(this.state.tipo ===2){
			 if(this.state.codautores.length<3){
				 this.state.codautores.push(this.state.alumnodnibus[0].codAlumno)
				  console.log(this.state.codautores)
				  fetch(CONFIG + 'mse/alumno/buscar/'+this.state.alumnobus.codigoAlumno)
	              .then((response)=>{
		           return response.json()
		         })
		 .then((alumno) =>{
			 this.state.autores.push(alumno)
		 })
		 .catch((error) =>{
			 console.log(error)
		 })
		 console.log(this.state.autores)
			 }else{
				 console.log("ya se registraron 3 autores")
			 }
		 }else{
	     console.log(this.state.pruebaa)
		 this.state.pruebaa.map((a)=>{
						if(this.state.codautores.length<3){
                          console.log(a)							
					     this.state.codautores.push(a)
						 fetch(CONFIG+'mse/alumno/buscar/'+a)
						 .then((response) =>{
							 return response.json()
						 })
						 .then((alumno) =>{
							 this.state.autores.push(alumno)
						 })
						 .catch((error) =>{
						   console.log(error)
						 })
						}else{
							console.log("ya se registraron 3 autores")
						}
		 })
		 console.log(this.state.codautores)
		 } 
	 }
      reloadRevista() {
        fetch(CONFIG + 'revista')
        .then((response) => {
            return response.json();
        })
        .then((revista) => {
            console.log(revista);
            this.setState({
                revistas:revista
            });
        })
        .catch((error) => {
            console.log(error);
        });

      }
    
      saveRevista = (e) => {
        e.preventDefault();
        let revista = {
          nombre: this.state.nombrere
        , link: this.state.linkre
        , indexacion: this.state.indexacion
        , linkindexacion: this.state.linkin
        };
        fetch(CONFIG + 'revista/',
             {method:'post',
			 headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            },
             body : JSON.stringify(revista)})
        .then((response) => {
            this.setState({
                //message: 'Revista added succesfully.',
                nestedModal: !this.state.nestedModal,
                closeAll: false
              });
            this.reloadRevista();
        })
        .catch((error) => {
            console.log(error);
        });
      }
      
      
      saveArticulo = (e) => {
        e.preventDefault();
		console.log(this.state.marca_temporal);
        let articulo = {
           marca_temporal : this.state.marca_temporal,
           numero_orcid : this.state.orcid,
           titulo : this.state.titulo ,
           doi : this.state.doi,
           link_articulo_publicado : this.state.linkar,
           issn_revista_journal : this.state.issn ,
           estado_conferencia : this.state.estadoconf ,
           nombre_conferencia : this.state.nombreconf,
           link_conferencia :  this.state.linkconf,
           comentario_conferencia : this.state.comconf,
           titulo_tesis : this.state.titulotesis,
           apellidos_nombres_asesor :  this.state.asesor,
           link_cybertesis :  this.state.linkcyber,
		   primer_autor : this.state.codautores[0],
		   segundo_autor : this.state.codautores[1]||'',
		   tercer_autor : this.state.codautores[2]||'',
           id_estado_publicacion : this.state.idestado,
           id_revista : this.state.idrevista
        };
		console.log(articulo);
        fetch(CONFIG + 'articuloCientifico',{
            method:'post',
			headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            },
            body :JSON.stringify(articulo)
        })
        .then((res) => {
            this.setState({
                //message: 'Articulo added succesfully.',
				isOpen : !this.state.modal,
				modal: !this.state.modal
              });
              this.reloadArticuloCientifico();
        })
        .catch((error) => {
            console.log(error);
        });
    
      }
      saveEstadoPublicacion = (e) => {
        e.preventDefault();
        let estado = { nombre: this.state.estadopu };
        fetch(CONFIG + 'estadoPublicacion',{
            method: 'post',
			headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            },
            body :JSON.stringify(estado)
        })
        .then((res) => {
            this.setState({
                nestedModale: !this.state.nestedModale,
                closeAll: false
              });
              this.reloadEstadoPublicacion();
        })
        .catch((error) => {
            console.log(error);
        });
      }
       
      editArticulo(articuloId){
        fetch(CONFIG + 'articuloCientifico/'+articuloId)
        .then((response) => {
            return response.json();
        })
        .then((res) => {
			console.log(res);
            let articulo = res;
            this.setState({
				hcrear: !this.state.hcrear,
				modal: !this.state.modal,
                marca_temporal : articulo.marca_temporal,
                orcid : articulo.numero_orcid,
                doi: articulo.doi,
                linkar :  articulo.link_articulo_publicado,
                issn : articulo.issn_revista_journal,
                estadoconf : articulo.estado_conferencia,
                nombreconf : articulo.nombre_conferencia,
                linkconf : articulo.link_conferencia,
                comconf : articulo.comentario_conferencia,
                titulotesis : articulo.titulo_tesis,
                asesor : articulo.apellidos_nombres_asesor,
                linkcyber : articulo.link_cybertesis,
				autor1 : articulo.primer_autor,
				autor2 : articulo.segundo_autor,
				autor3 : articulo.tercer_autor,
                idrevista : articulo.id_revista,
                idestado : articulo.id_estado_publicacion,
				titulo : articulo.titulo,
				idarticulo : articulo.id_articulo_cientifico
              })
        })
        .catch((error) => {
            console.log(error);
        });
      }
	  saveArticuloe = (e) => {
        e.preventDefault();
		
        let articulo = {
           numero_orcid : this.state.orcid,
           titulo : this.state.titulo ,
           doi : this.state.doi,
           link_articulo_publicado : this.state.linkar,
           issn_revista_journal : this.state.issn ,
           estado_conferencia : this.state.estadoconf ,
           nombre_conferencia : this.state.nombreconf,
           link_conferencia :  this.state.linkconf,
           comentario_conferencia : this.state.comconf,
           titulo_tesis : this.state.titulotesis,
           apellidos_nombres_asesor :  this.state.asesor,
           link_cybertesis :  this.state.linkcyber,
		   primer_autor : this.state.autor1,
		   segundo_autor : this.state.autor2,
		   tercer_autor : this.state.autor3,
           id_estado_publicacion : this.state.idestado,
           id_articulo_cientifico : this.state.idarticulo,
		   id_revista : this.state.idrevista
        };
		console.log(articulo);
        fetch(CONFIG + 'articuloCientifico',{
            method:'put',
			headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
            body :JSON.stringify(articulo)
        })
        .then((res) => {
            this.setState({
                //message: 'Articulo added succesfully.',
				modal: !this.state.modal,
				isOpen : !this.state.modal
              });
              this.reloadArticuloCientifico();
        })
        .catch((error) => {
            console.log(error);
        });

      }
      deleteArticulo(articuloId) {
        fetch(CONFIG + 'articuloCientifico/'+articuloId,{
            method : 'delete'
        })
        .then((res) => {
            //this.setState({ message: 'Articulo deleted succesfully.' });
            this.setState({ articulos: this.state.articulos.filter(articulo => articulo.id_articulo_cientifico !== articuloId) });
        })
        .catch((error) => {
            console.log(error);
        });
  
    }
    
      reloadEstadoPublicacion() {
        fetch(CONFIG + 'estadoPublicacion')
        .then((response) => {
            return response.json();
        })
        .then((res) => {
           this.setState({ estados: res })
          })
        .catch((error) => {
            console.log(error);
        });
      }
    
      reloadArticuloCientifico() {
        fetch(CONFIG + 'articuloCientifico')
        .then((response) => {
            return response.json();
        })
        .then((res) => {
            this.setState({ articulos: res})
          })
        .catch((error) => {
            console.log(error);
        });

      }
      toggle() {
        this.setState({
          modal: !this.state.modal,
		  hcrear: false,
		  marca_temporal : this.state.marca_temporal,
                orcid : '',
                doi: '',
                linkar :  '',
                issn : '',
                estadoconf : '',
                nombreconf : '',
                linkconf : '',
                comconf : '',
                titulotesis : '',
                asesor : '',
                linkcyber : '',
				autor1 : '' ,
				autor2 : '' ,
				autor3 : '' ,
                idrevista : '',
                idestado : '',
				titulo : '',
				idarticulo : ''
        });
      }
      handleChangeName(event) {
        this.setState({ name: event.target.value });
      }
      handleChangeTeam(event) {
        this.setState({ team: event.target.value });
      }
      handleChangeCountry(event) {
        this.setState({ country: event.target.value });
      }
    
      handleSubmit(event) {
        event.preventDefault();
      }
      	buscar(tipo){
		  if(tipo ===1){
		   fetch(CONFIG + 'mse/alumno/buscar/'+this.state.codigo)
        .  then((response) => {
            return response.json();
        })
        .then((alumno) => {
           this.setState({
                alumnobus:alumno,
				tipo : 1
            })
            console.log(this.state.alumnobus);
        })
        .catch((error) => {
            console.log(error);
        });
		  }else if(tipo === 2){
			 fetch(CONFIG + 'alumnoprograma/leer/dni/'+this.state.dnibus)
        .  then((response) => {
            return response.json();
        })
        .then((alumno) => {
            this.setState({
                alumnodnibus:alumno,
				tipo:2
            })
			console.log(this.state.alumnodnibus)
        })
        .catch((error) => {
            console.error(error)
        });
		  }else{
            var nombreValidado = this.ValidarNombre(this.state.apynombus);
    var nombres = this.state.apynombus.toUpperCase();
    if(nombreValidado){
    var separador = " "; // un espacio en blanco
    var arregloDeSubCadenas = nombres.split(separador);
    // console.log("arreglo de subcadenas");
    // console.log(arregloDeSubCadenas);
    var arreglo = [];
    for (let i = 0; i< arregloDeSubCadenas.length; i++) {
      if(arregloDeSubCadenas[i]!==''){
         arreglo.push(arregloDeSubCadenas[i])
      }
    }
    // console.log("arreglo sin espacios en blanco");
    // console.log(arreglo);
    var nombrenuevo = arreglo.join(" & ");
	console.log(nombrenuevo);
    fetch(CONFIG+'/recaudaciones/alumno/concepto/listar_codigos/'+ nombrenuevo)
          .then(
            (response)=>{
              return response.json();
            })
          .then((cod_alumno)=>{
            console.log("alumnos");
            console.log(cod_alumno);
            if(cod_alumno.length>0){
				  this.setState({
                alumnos:cod_alumno,
				tipo :3
            })
			console.log(this.state.alumnos)
              }
              else{

              }
            })
            .catch(error => {
                console.error(error)
            });
        }     
		  }
		  
	  }
	  
	  ValidarNombre(nombres){
      if(!nombres){
        alert("Ingrese un nombre");
        return false;
      }else{
        return true;
      }
     }
	
      toggleNested() {
        this.setState({
          nestedModal: !this.state.nestedModal,
          closeAll: false
        })
      }
    
      toggleNestede() {
        this.setState({
          nestedModale: !this.state.nestedModale,
          closeAll: false
        })
      }
    
      toggleAll() {
        this.setState({
          nestedModal: !this.state.nestedModal,
          closeAll: true
        })
      }
      onChange = (e) =>
	  { 
	  this.setState({ [e.target.name]: e.target.value });
	   if(e.target.name === "estadoconf"){
	    if(e.target.value ==="SI") this.togglet('2');
        else this.togglet('3');		
	  }}
    
      togglet(tab) {
        if (this.state.activeTab !== tab) {
          this.setState({
            activeTab: tab
          });
        }
      }
    
      loadJournal(){
        fetch(CONFIG + 'mse/alumno/buscar/'+this.state.codigo)
        .then((response) => {
            return response.json();
        })
        .then((alumno) => {
           this.setState({
                alumno:alumno
            })
            console.log(this.state.alumno);
        })
        .catch((error) => {
            console.log(error);
        });

    }
    
    Regresar=(e)=>{
        browserHistory.push('/'+this.state.codigo);
        e.preventDefault();
    }
    
    render(){
        return (
            <div className="">
              {/*<Button color="success" onClick={this.toggle}>Agregar</Button>*/}
              <h3>REGISTRO ARTICULO CIENTIFICO
                <ul id="nav-mobile" className=" row right  hide-on-med-and-down">
                    <li ><a className="seleccionar col" onClick={this.Regresar} >Regresar<i className="material-icons right">reply</i></a></li>
                </ul>
                </h3>
				<div className="SplitPane row">
              <div className=" col-xs-3">
                        <div className="Panel row">
                          <div className=" col-xs-1">     
                          </div>
						  <div className=" col-xs-5">
						   
        <h4 className="center ">Datos personales</h4>
        <div className="center datos">
        <div>
        <i className="material-icons medium">account_circle</i>
        </div>
        <b>Codigo:</b>
        <div>
        </div>
        <div className="negro">
        {this.state.alumno.codigoAlumno}
        </div>
         </div>

						  </div>
                          <div className=" col-xs-6">
                            <h6 align="center" className="Alumno"><b>Nombres:</b></h6>
                            <h6 align="center" className="negro">{this.state.alumno.nombre}</h6>
								{/* <h6 align="center" className="Alumno"><b>Estado del alumno:</b></h6>
								<h6 align="center" className="negro">{this.state.alumno.estado}</h6>*/}
                          
                          </div>
                        </div>
              </div>
			  </div>

              <button className="btn btn-success" onClick={() => this.toggle()}>Agregar</button>
                      <table className="table table-striped">
                          <thead>
                              <tr>
							  {/* <th className="hidden">Id</th>-*/}
                                  <th>Titulo</th>
                                  <th>ORCID</th>
                                  <th>DOI</th>
       
                              </tr>
                          </thead>
                          <tbody>
                              {this.state.articulos.map(
                                  articulo =>
                                      <tr key={articulo.id_articulo_cientifico}>
                                          <td>{articulo.titulo}</td>
                                          <td>{articulo.numero_orcid}</td>
                                          <td>{articulo.doi}</td>
                                          <td>
										      <button className="btn btn-success" onClick={() => this.editArticulo(articulo.id_articulo_cientifico)}>Editar</button>
                                              <button className="btn btn-danger" onClick={() => this.deleteArticulo(articulo.id_articulo_cientifico)}>Eliminar</button>
                                          </td>
                                      </tr>
                              )}
                          </tbody>
                      </table>
              <Modal className=" modal-lg" isOpen={this.state.modal}>
                <form onSubmit={this.handleSubmit}>
                  <ModalHeader toggle={this.toggle}>Registro de Articulo Cientifico</ModalHeader>
                  <ModalBody>
                    <Nav tabs>
                      <NavItem>
                        <NavLink
                          className={classnames({ active: this.state.activeTab === '1' })}
                          onClick={() => { this.togglet('1'); }}
                        >
                          Articulo
                  </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames({ active: this.state.activeTab === '2' })}
                          onClick={() => { this.togglet('2'); }}
                        >
                          Conferencia
                  </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames({ active: this.state.activeTab === '3' })}
                          onClick={() => { this.togglet('3'); }}
                        >
                          Autores, Asesor
                  </NavLink>
                      </NavItem>
                    </Nav>
                    <TabContent activeTab={this.state.activeTab}>
                      <TabPane tabId="1">
                        <div className="row">
                          <div className="form-group col-md-9 ">
                            <label>Titulo:</label>
                            <input type="text" value={this.state.titulo} name="titulo" onChange={this.onChange} className="form-control" />
                          </div>
                          <div className="form-group col-md-3 ">
                            <label>Numero ORCID:</label>
                            <input type="text" value={this.state.orcid || ' '} name="orcid" onChange={this.onChange} className="form-control" />
                          </div>
                        </div>
                        <div className="row">
                          <div className="form-group col-md-3">
                            <label>DOI:</label>
                            <input type="text" value={this.state.doi} name="doi" onChange={this.onChange} className="form-control" />
                          </div>
                          <div className="form-group col-md-9">
                            <label>Link del articulo:</label>
                            <input type="text" value={this.state.linkar} name="linkar" onChange={this.onChange} className="form-control" />
                          </div>
                        </div>
                        <div className="row">
                          <div className="form-group col-md-5">
                            <label>Revista</label>
                            <select className="custom-select" name="idrevista" value={this.state.idrevista} onChange={this.onChange}>
                              <option value="">
                                Selecione una revista
                          </option>
                              {this.state.revistas.map((revista, i) =>
                                <option key={i} value={revista.id_revista}>
                                  {revista.nombre}
                                </option>
                              )}
                            </select>
                          </div>
                          <div className="form-group col-md-1 ">
                            <label className="text-white">A</label>
                            <Button color="success" onClick={this.toggleNested}>+</Button>
                          </div>
                          <div className="form-group col-md-5">
                            <label>Estado Publicacion</label>
                            <select className="custom-select" name="idestado" value={this.state.idestado} onChange={this.onChange}>
                              <option value="">
                                Selecione un estado
                          </option>
                              {this.state.estados.map((estado, i) =>
                                <option key={i} value={estado.id_estado_publicacion}>
                                  {estado.nombre}
                                </option>
                              )}
                            </select>
                          </div>
                          <div className="form-group col-md-1 ">
                            <label className="text-white">A</label>
                            <Button color="success" onClick={this.toggleNestede}>+</Button>
                          </div>
                        </div>
                        <div className="row">
                          <div className="form-group col-md-6">
                            <label>ISSN :</label>
                            <input type="text" value={this.state.issn} name="issn" onChange={this.onChange} className="form-control" />
                          </div>
						  <div className="form-group col-md-4">
                            <label>Estado de Conferencia:</label>
							<select className="custom-select" name="estadoconf" value={this.state.estadoconf} onChange={this.onChange}>
                              <option value="">
                                Selecione un estado
                          </option>
                                <option  value={"SI"}>
                                  SI
                                </option>
								<option  value={"NO"}>
                                  NO
                                </option>
                            </select>
                          </div>
                        </div>
                        <Modal className=" modal-sm" isOpen={this.state.nestedModal} toggle={this.toggleNested} onClosed={this.state.closeAll ? this.toggle : undefined}>
                          <form >
                            <ModalHeader >Registro Revista</ModalHeader>
                            <ModalBody >
                              <div className="row">
                                <div className="form-group col-md-12">
                                  <label>Nombre Revista :</label>
                                  <input type="text" value={this.state.nombrere} name="nombrere" onChange={this.onChange} className="form-control" />
                                </div>
                              </div>
                              <div className="row">
                                <div className="form-group col-md-12">
                                  <label>Link Revista :</label>
                                  <input type="text" value={this.state.linkre} name="linkre" onChange={this.onChange} className="form-control" />
                                </div>
                              </div>
                              <div className="row">
                                <div className="form-group col-md-12">
                                  <label>Indexacion :</label>
                                  <input type="text" value={this.state.indexacion} name="indexacion" onChange={this.onChange} className="form-control" />
                                </div>
                              </div>
                              <div className="row">
                                <div className="form-group col-md-12">
                                  <label>Link Indexacion :</label>
                                  <input type="text" value={this.state.linkin} name="linkin" onChange={this.onChange} className="form-control" />
                                </div>
                              </div>
                            </ModalBody>
                            <ModalFooter>
                              <Button color="primary" onClick={this.saveRevista}>Crear</Button>{' '}
                              <Button color="secondary" onClick={this.toggleAll}>All Done</Button>
                            </ModalFooter>
                          </form>
                        </Modal>
                        <Modal className="modal-sm" isOpen={this.state.nestedModale} toggle={this.toggleNestede} onClosed={this.state.closeAll ? this.toggle : undefined}>
                          <form >
                            <ModalHeader >Registro Estado Publicación</ModalHeader>
                            <ModalBody >
                              <div className="row">
                                <div className="form-group col-md-12">
                                  <label>Nombre Estado Publicación:</label>
                                  <input type="text" value={this.state.estadopu} name="estadopu" onChange={this.onChange} className="form-control" />
                                </div>
                              </div>
      
                            </ModalBody>
                            <ModalFooter>
                              <Button color="primary" onClick={this.saveEstadoPublicacion}>Crear</Button>{' '}
                              <Button color="secondary" onClick={this.toggleAll}>All Done</Button>
                            </ModalFooter>
                          </form>
                        </Modal>
                      </TabPane>
                      <TabPane tabId="2">
      
                        <div className="row">
                          <div className="form-group col-md-8">
                            <label>Nombre Conferencia:</label>
                            <input type="text" value={this.state.nombreconf} name="nombreconf" onChange={this.onChange} className="form-control" />
                          </div>
                        </div>
                        <div className="row">
                        <div className="form-group col-md-6">
                            <label>Link Conferencia:</label>
                            <input type="text" value={this.state.linkconf} name="linkconf" onChange={this.onChange} className="form-control" />
                          </div>
                          <div className="form-group col-md-6">
                            <label>Comentario:</label>
                            <input type="text" value={this.state.comconf} name="comconf" onChange={this.onChange} className="form-control" />
                          </div>
                          
                        </div>
      
                      </TabPane>
                      <TabPane tabId="3">
                         <button className="btn btn-success" onClick={this.toggleNestede}>Agregar</button>
						 <Modal className="modal-lg" isOpen={this.state.nestedModale} toggle={this.toggleNestede} onClosed={this.state.closeAll ? this.toggle : undefined}>
                          <form >
                            <ModalHeader >Busqueda Autor</ModalHeader>
                            <ModalBody >
							<Nav tabs>
                      <NavItem>
                        <NavLink
                          className={classnames({ active: this.state.activeTab === '4' })}
                          onClick={() => { this.togglet('4'); }}
                        >
                          Codigo
                  </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames({ active: this.state.activeTab === '5' })}
                          onClick={() => { this.togglet('5'); }}
                        >
                         DNI
                  </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames({ active: this.state.activeTab === '6' })}
                          onClick={() => { this.togglet('6'); }}
                        >
                          Apellidos,Nombres
                  </NavLink>
                      </NavItem>
                    </Nav>
					<TabContent activeTab={this.state.activeTab}>
					<TabPane tabId="4">
                              <div className="row">
                                <div className="form-group col-md-12">
                                  <label>Codigo:</label>
                                  <input type="text" value={this.state.codbus} name="codbus" onChange={this.onChange} className="form-control" />
                                </div>
								<button className="btn btn-success" onClick={() => this.buscar(1)}>Buscar</button>
								
								<table className="table table-striped">
                          <thead>
                              <tr>
                                  <th className="hidden">Codigo</th>
                                  <th>Nombre</th>
                                  <th>Apellido Pat.</th>
                                  <th>Apellido Mat.</th>
                              </tr>
                          </thead>
                          <tbody>
                                      <tr key={this.state.alumnobus.codigoAlumno}>
                                          <td>{this.state.alumnobus.codigoAlumno}</td>
                                          <td>{this.state.alumnobus.nombre}</td>
                                          <td>{this.state.alumnobus.apellidoPaterno}</td>
                                          <td>{this.state.alumnobus.apellidoMaterno}</td>
									  </tr>
                              
                          </tbody>
							</table>
                              </div>
                   </TabPane>
				   <TabPane tabId="5">
                              <div className="row">
                                <div className="form-group col-md-12">
                                  <label>DNI:</label>
                                  <input type="text" value={this.state.dnibus} name="dnibus" onChange={this.onChange} className="form-control" />
                                </div>
								<button className="btn btn-success" onClick={() => this.buscar(2)}>Buscar</button>
								<table className="table table-striped">
                          <thead>
                              <tr>
                                  <th className="hidden">Codigo</th>
                                  <th>Nombre</th>
                                  <th>Apellido Pat.</th>
                                  <th>Apellido Mat.</th>
                              </tr>
                          </thead>
                          <tbody>
                               {this.state.alumnodnibus.map(
                                  alumno =>
                                      <tr key={alumno.codAlumno}>
									     <td>{alumno.codAlumno}</td>
                                          <td>{alumno.nomAlumno}</td>
                                          <td>{alumno.apePaterno}</td>
										  <td>{alumno.apeMaterno}</td>
                                          
                                      </tr>
                              )}
                                    
                              
                          </tbody>
										  </table>
                              </div>
                   </TabPane>
				   <TabPane tabId="6">
                              <div className="row">
                                <div className="form-group col-md-12">
                                  <label>Apellidos y Nombres:</label>
                                  <input type="text" value={this.state.apynombus} name="apynombus" onChange={this.onChange} className="form-control" />
                                </div>
								<button className="btn btn-success" onClick={() => this.buscar(3)}>Buscar</button>
								<table className="table table-striped">
                          <thead>
                              <tr>
                                  <th>Select</th>
                                  <th>Codigo</th>
                                  <th>Nombres</th>
                                  <th>Programa</th>
                                  
                              </tr>
                          </thead>
                          <tbody>
						   
                              {this.state.alumnos.map(
                                  alumno =>
                                      <tr key={alumno.cod_alumno}>
									     <td><form action="#">
            <label className="row center-xs color_white">
                <input
                onClick={this.pu}
                className="checkbox1"
                value={alumno.cod_alumno}
                type="checkbox"/>
                 <span> </span>
            </label>
          </form></td>
									     <td>{alumno.cod_alumno}</td>
                                          <td>{alumno.nombre_alumno}</td>
                                          <td>{alumno.nombre_programa}</td>
                                          
                                      </tr>
                              )}
                                      
                             
                          </tbody>
										  </table>
                              </div>
                   </TabPane>
				   </TabContent>
                            </ModalBody>
                            <ModalFooter>
                              <Button color="primary" onClick={this.agregarautor}>Agregar</Button>{' '}
                              <Button color="secondary" onClick={this.toggleAll}>All Done</Button>
                            </ModalFooter>
                          </form>
                        </Modal>
						<table className="table table-striped">
                          <thead>
                              <tr>
                                  <th>Codigo</th>
								  <th>Nombre</th>
								  <th>Apellido Pat.</th>
								  <th>Apellido Mat.</th>
								  /*<th>Tipo Autor</th>*/
                              </tr>
                          </thead>
                          <tbody>
                               {this.state.autores.map(
                                  autor =>
                                      <tr key={autor.codigoAlumno}>
									     <td>{autor.codigoAlumno}</td>
										 <td>{autor.nombre}</td>
										 <td>{autor.apellidoPaterno}</td>
										 <td>{autor.apellidoMaterno}</td>
											 {/* <td>
          <Select
            id="conceptos"
            className="conceptos"
            value={this.state.selectedOption}
            onChange={this.handleChange}
            options={this.state.options}
            disabled={this.state.desabilitar}
          />

											 </td>*/}
				1																 
                                      </tr>
                              )}

                          </tbody>
						</table>
                        <div className="row">
                          <div className="form-group col-md-12">
                            <label>Titulo Tesis:</label>
                            <input type="text" value={this.state.titulotesis} name="titulotesis" onChange={this.onChange} className="form-control" />
                          </div>
                        </div>
                        <div className="row">
                          <div className="form-group col-md-6">
                            <label>Asesor:</label>
                            <input type="text" value={this.state.asesor} name="asesor" onChange={this.onChange} className="form-control" />
                          </div>
                          <div className="form-group col-md-6">
                            <label>Link Cybertesis:</label>
                            <input type="text" value={this.state.linkcyber} name="linkcyber" onChange={this.onChange} className="form-control" />
                          </div>
                        </div>
      
                      </TabPane>
                    </TabContent>
                  </ModalBody>
                  <div className="progress" style={{ height: 20 + 'px', margin: 20 + 'px' }}>
                    <div className="progress-bar" role="progressbar" style={{ width: 50 + '%' }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                  <ModalFooter>
                    <Button  value="Crear" onClick={this.saveArticulo} hidden={this.state.hcrear}  color="primary" className="btn btn-primary" >Crear</Button>{''}
					<Button  value="Editar" onClick={this.saveArticuloe} hidden={!this.state.hcrear} color="primary" className="btn btn-success" >Editar</Button>{''}
                    <Button color="danger" onClick={this.toggle}>Cerrar</Button>
                  </ModalFooter>
                </form>
              </Modal>
            </div>
      
          );
    }
}