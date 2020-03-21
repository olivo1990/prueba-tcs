package com.empleado.empleado.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

/**
 * Se crea la entidad empleado
 */
@Entity
@Data
@Table(name = "empleados")
public class Empleado{

    @Id
    private long id;
    private String nombre;
    private String apellidos;
    @Column(name = "documento")
    private long nroDocumento;
    private String correo;
    private long telefono;
    private int activo;
    private double salario;
    @Column(name = "id_departamento")
    private long idDepartamento;
}