package com.departamento.departamento.entities;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Data
@Table(name = "departamentos")
public class Departamento{

    @Id
    private long id;
    private String nombre;
    private String descripcion;
    private int codigo;

}