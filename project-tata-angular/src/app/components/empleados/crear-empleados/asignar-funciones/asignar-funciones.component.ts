import { Component, OnInit, Input } from '@angular/core';
import { Funcion } from '../../../../models/Funcion';
import { DepartamentosService } from '../../../../services/departamentos.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-asignar-funciones',
  templateUrl: './asignar-funciones.component.html',
  styleUrls: ['./asignar-funciones.component.css']
})
export class AsignarFuncionesComponent implements OnInit {
    
  funcion: Funcion;
  funcionesDepartamento: Funcion[];
  funcionesEnvio: Funcion[];
  nombre: string;
  descripcion: string;

  constructor(private departamentosServices: DepartamentosService) { 
    this.funcion = new Funcion();
  }

  ngOnInit() {
    this.departamentosServices.idDepartamento$.subscribe(idDepartamento=>{
      console.log(idDepartamento);
      if(idDepartamento > 0){
        this.funcionesEnvio = [];
        this.funcion.idDepartamento = idDepartamento;
        this.departamentosServices.listarFuincionesDepartamento(idDepartamento).subscribe(response=>{
          this.funcionesDepartamento = response;
        })
      }
    })
    
  }

  agregar(): void{

    let funcion = new Funcion();

    if(this.nombre === undefined || this.nombre === ""){
      swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El nombre de la función es obligatoria!'
      })
      return;
    }

    if(this.descripcion === undefined || this.descripcion === ""){
      swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'La descripción de la función es obligatoria!'
      })
      return;
    }
    
    funcion.id = null;
    funcion.nombre = this.nombre;
    funcion.descripcion = this.descripcion;
    funcion.idDepartamento = this.funcion.idDepartamento;
    
    this.funcionesDepartamento.push(funcion);
    this.funcionesEnvio.push(funcion);
    this.departamentosServices.funcionesEnvio = this.funcionesEnvio;

    this.nombre = "";
    this.descripcion = "";

  }

}
