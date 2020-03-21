import { Injectable } from '@angular/core';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Funcion } from '../models/Funcion';

@Injectable({
  providedIn: 'root'
})
export class DepartamentosService {
  
  /* Se inicializa la api que va a llamar al microservicio de departamento */
  private API = environment.APIDEPARTAMENTO;
  
  /* Se crea el id del departamento como un observable, ya que se necesita para buscar y agregar las funcionalidades al departamento */
  idDepartamento$: BehaviorSubject<number>;

  /* La lista que se utiliza para almacenar de manera temporal las funciones del departamento */
  funcionesEnvio: Funcion[];
  
  constructor(private http: HttpClient) {
    this.idDepartamento$ = new BehaviorSubject<number>(0);
  }
  
  /* Se setea el id del departamento  */
  setIdeDepartamento(idDepartamento: number){
    this.idDepartamento$.next(idDepartamento);
  }
  
  /* Metodo que devuelve la lista de departamentos llamando al microservicio departamento  */
  listarDepartamentos(): Observable<any>{
    const urlEndpoint = this.API+'/listarDepartamentos';

    return this.http.get(urlEndpoint).pipe(
      catchError(e => {
        if(e.status==400){
            return throwError(e);
        }
        if(e.error.mensaje){
          console.log(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }
  
  /* Metodo que devuelve la lista de funciones por departamento */
  listarFuincionesDepartamento(idDepartamento: number): Observable<any>{
    const urlEndpoint = this.API+'/listarFuncionesDepartamento';

    return this.http.get(`${urlEndpoint}/${idDepartamento}`).pipe(
      catchError(e => {
        if(e.status==400){
            return throwError(e);
        }
        if(e.error.mensaje){
          console.log(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }
  
  /* Metodo que guarda las funciones del departamento */
  guardarFuncionesDepartamento(funciones: Funcion[]): Observable<any>{
    const urlEndpoint = this.API+'/guardarFuncionesDepartamento';

    console.log(funciones);

    return this.http.post<any>(urlEndpoint, funciones).pipe(
      catchError(e => {
        if(e.status==400){
            return throwError(e);
        }
        if(e.error.mensaje){
          console.log(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }
}
