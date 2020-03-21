package com.departamento.departamento.interfaces;

import java.util.List;

import com.departamento.departamento.entities.Departamento;
import com.departamento.departamento.entities.Funciones;

public interface IDepartamentosService{
    public List<Departamento> listar();
    
    public List<Funciones> listarFunciones(long idDepartamento);

    public List<Funciones> guardarFunciones(List<Funciones> funciones);
}