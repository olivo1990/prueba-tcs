// Imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MaterialModule } from './config/material-module';
import { NgMaterialMultilevelMenuModule } from 'ng-material-multilevel-menu';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { SlidebarComponent } from './components/layout/slidebar/slidebar.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { EmpleadosComponent } from './components/empleados/empleados.component';
import { CrearEmpleadoComponent } from './components/empleados/crear-empleados/crear-empleado.component';
import { AsignarFuncionesComponent } from './components/empleados/crear-empleados/asignar-funciones/asignar-funciones.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    HeaderComponent,
    SlidebarComponent,
    FooterComponent,
    EmpleadosComponent,
    CrearEmpleadoComponent,
    AsignarFuncionesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    NgMaterialMultilevelMenuModule
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
