import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Empleado } from '../../../models/empleado';
import { Departamento } from '../../../models/departamento';
import swal from 'sweetalert2';
import { DepartamentosService } from '../../../services/departamentos.service';
import { EmpleadosService } from '../../../services/empleados.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-empleado',
  templateUrl: './crear-empleado.component.html',
  styleUrls: ['./crear-empleado.component.css']
})
export class CrearEmpleadoComponent implements OnInit {
  
  /* Objeto de tipo empleado que se utiliza para alamacenar los datos del empleado que está en el formulario */
  empleado: Empleado;
  /* Objeto de tipo empleado que se utiliza en la actualización del empleado */
  actualizarEmpleado: Empleado;
  /* Se inicializa el atributo que se encarga de alamcenar la lista de departamentos */
  departamentos: Departamento[];
  idEmpleado: number;
  verFunciones: boolean;

  constructor(private location: Location, private empleadosService: EmpleadosService, private departamentosServices: DepartamentosService, private router: Router) { 
    this.empleado = new Empleado();
  }

  ngOnInit() {
     this.idEmpleado = 0;

    /* Se llama el objeto que almacena de manera temporal los datos del empleado para actualizarlos */
    this.actualizarEmpleado = this.empleadosService.actualizarEmpleado;
    
    /* Se valida que los datos para actualizar existan, sino se inserta un nuevo empleado */
    if(Object.keys(this.actualizarEmpleado).length > 0){
      this.empleado = this.actualizarEmpleado;
      this.idEmpleado = this.empleado.id;
      this.cargarFunciones();
    }

    this.departamentosServices.listarDepartamentos().subscribe(response =>{
      this.departamentos = response;
    });
  }
  
  /* Metodo que se utiliza para seleccionar el departamento que se necesita actualizar */
  compararDepartamento(o1: Departamento, o2: Departamento): boolean {
    if (o1 === undefined && o2 === undefined) {
      return true;
    }

    return o1 === null || o2 === null || o1 === undefined || o2 === undefined ? false : o1 === o2;
  }
  
  /* Metodo que se utiliza para cargar las funciones del departamento que se muestran en otro componente */
  cargarFunciones(): void{
    this.verFunciones = false;
    if(this.empleado.idDepartamento !== undefined){
      this.verFunciones = true;
      this.departamentosServices.setIdeDepartamento(this.empleado.idDepartamento);
    }
  }
  
  /* Metodo que guarda al empleado */
  crear(): void{
    
    /* Se carga las funciones del departamento */
    let funcionesDespartamento = this.departamentosServices.funcionesEnvio;
    
    /* Se realiza las validaciones pertinentes de los datos del empleado */
    if(this.empleado.nombre === undefined || this.empleado.nombre === ""){
      swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El nombre del empleado es obligatorio!'
      })
      return;
    }

    if(this.empleado.apellidos === undefined || this.empleado.apellidos === ""){
      swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El apellido del cliente es obligatorio!'
      })
      return;
    }

    if(this.empleado.nroDocumento === undefined || this.empleado.nroDocumento === 0){
      swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El nro documento del cliente es obligatorio!'
      })
      return;
    }

    if(this.empleado.correo === undefined || this.empleado.correo === ""){
      swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El correo del cliente es obligatorio!'
      })
      return;
    }

    if(this.empleado.telefono === undefined || this.empleado.telefono === 0){
      swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El télefono del cliente es obligatorio!'
      })
      return;
    }

    if(this.empleado.salario === undefined || this.empleado.salario === 0){
      swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El salario del cliente es obligatorio!'
      })
      return;
    }

    if(this.empleado.idDepartamento === undefined || this.empleado.idDepartamento === 0){
      swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Es necesario seleccionar el departamento!'
      })
      return;
    }
    
    /* Se crea con el estado activo al empleado */
    if(this.empleado.activo === undefined){
      this.empleado.activo = 1;
    }
    
    /* Se llama al servicio que guarda y actualiza los datos del empleado */
    this.empleadosService.guardarEmpleado(this.empleado, this.idEmpleado).subscribe(response =>{
      this.router.navigate(['/empleados']);
      this.empleadosService.buscarEmpleados = true;
      swal.fire({
        position: 'top-end',
        icon: 'success',
        title: `Se ha guardado con éxito el empleado ${this.empleado.nombre}`,
        showConfirmButton: false,
        timer: 3000
      })
    })

    /* Si el departamento tiene  funciones, se llama al servicio que guarda dichas funciones */
    if(funcionesDespartamento !== undefined){
      this.departamentosServices.guardarFuncionesDepartamento(funcionesDespartamento).subscribe(response =>{});
    }
  }
  
  /* Metodo que regresa hacia atras */
  regresar(): void{
    this.location.back();
  }

}
