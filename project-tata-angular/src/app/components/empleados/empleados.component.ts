import { Component, OnInit, ViewChild } from '@angular/core';
import { Empleado } from '../../models/empleado';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { EmpleadosService } from '../../services/empleados.service';
import swal from 'sweetalert2';
import { DepartamentosService } from '../../services/departamentos.service';
import { Departamento } from '../../models/departamento';

@Component({
  selector: 'app-clientes',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {
  
  /* Se crea un objeto de tipo empleado */
  empleado: Empleado;
  /* Se inicia el paginador */
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  /* Se iniciaaliza la lista de empleados buscados */
  empleadosBuscados: Empleado[];
  /* Se inicializa las columnas que se van a mostrar en la tabla de resultados */
  displayedColumns: string[] = ['nombre', 'apellido', 'nroDocumento', 'correo', 'telefono', 'estado', 'salario', 'departamento', 'editar'];
  dataSource = new MatTableDataSource<Empleado>(this.empleadosBuscados);
  /* Con este boolean puedo ocultar la tabla de resultados sino encuentro registros */
  isLoading: boolean;
  departamentos: Departamento[];
  filtroRangoSalario: string;
  
  /* Con el contructor de realiza la inyección de dependecias para utilizar los metodos de los servicios EmpleadosService y DepartamentosService */
  constructor(private empleadosService: EmpleadosService, private departamentosServices: DepartamentosService) {
    this.empleado = new Empleado();
    this.isLoading = true;
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    /* Listo los departamentos para mostrarlos en la tabla de resultados */
    this.departamentosServices.listarDepartamentos().subscribe(response =>{
      this.departamentos = response;
    });
    /* Es un pequeño detalle para mostrar los empleados nuevos o los editados */
    if(this.empleadosService.buscarEmpleados){
      this.buscar();
    }
  }
  
  /* Lista los empleados */
  buscar(): void{

      let nroDocumento: number = 0;
      let salario: number = 0;
      
      /* Valido que los filtros no estén indefinidos o nulos */
      if(this.empleado.nroDocumento !== undefined && this.empleado.nroDocumento !== null){
        nroDocumento = this.empleado.nroDocumento;
      }

      if(this.empleado.salario !== undefined && this.empleado.salario !== null){
        salario = this.empleado.salario;
      }
      
      /* Se llama al servicio que devuelve la lista de empleados */
      this.empleadosService.listaEmpleados().subscribe(response =>{
        this.isLoading = true;
        
        /* Se aplica los filtros seleccionados en la lsta de empleados */
        this.empleadosBuscados = this.aplicarFiltros(nroDocumento, salario, response);

        if(this.empleadosBuscados.length > 0){
          this.isLoading = false;
        }

        this.dataSource = new MatTableDataSource<Empleado>(this.empleadosBuscados);
        this.dataSource.sort = this.sort;
   
      });
  }

  private aplicarFiltros(nroDocumento: number, salario: number, empleados: Empleado[]): Empleado[]{

    let empleadosFiltrados: Empleado[];
    
    if(empleados.length > 0){
      if(nroDocumento > 0 || salario > 0){
      
        if(nroDocumento > 0){
          /* Se filtra por el número de documento */
          empleadosFiltrados = Object.assign([], empleados).filter(
            item => item.nroDocumento === nroDocumento
          )
          empleados = empleadosFiltrados;
        }
  
        if(salario > 0){
            /* Se filtra por el salario dependiendo del otro filtro que busca por el rango de salarios */
            empleadosFiltrados = Object.assign([], empleados).filter(
            item => {
              if(this.filtroRangoSalario == undefined){
                return item.salario === salario;
              }else if(this.filtroRangoSalario == "1"){
                return item.salario > salario;
              }else if(this.filtroRangoSalario == "2"){
                return item.salario < salario;
              }
              
            }
          )
        }
      }else{
        empleadosFiltrados = empleados;
      }
    }

    return empleadosFiltrados;
  }
  
  /* Metodo que cambia el estado del empleado */
  cambiarEstado(empleado: Empleado): void{
    
    swal.fire({
      title: '¿Está seguro de cambiar el estado de el empleado?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'No',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.value) {
        /* Se cambia el estado del empleado */
        empleado.activo = !empleado.activo ? 1:0;
        
        let idEmpleado = empleado.id;

        /* Se llama al servicio que guarda los datos del empleado */
        this.empleadosService.guardarEmpleado(empleado, idEmpleado).subscribe(response =>{
          swal.fire({
            position: 'top-end',
            icon: 'success',
            title: `Se realizaron los cambios con éxito`,
            showConfirmButton: false,
            timer: 3000
          })
        })

      }
    })
  }

}
