import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { EmpleadosComponent } from './components/empleados/empleados.component';
import { CrearEmpleadoComponent } from './components/empleados/crear-empleados/crear-empleado.component';


const routes: Routes = [
  { path: 'inicio', component: InicioComponent},
  { path: 'empleados', component: EmpleadosComponent},
  { path: 'empleados/crear-empleado', component: CrearEmpleadoComponent},
  { path: '**', pathMatch: 'full', redirectTo: 'inicio' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
