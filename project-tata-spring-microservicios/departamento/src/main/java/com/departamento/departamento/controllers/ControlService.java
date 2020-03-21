package com.departamento.departamento.controllers;

import java.util.List;

import com.departamento.departamento.entities.Departamento;
import com.departamento.departamento.entities.Funciones;
import com.departamento.departamento.interfaces.IDepartamentosService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = {"http://localhost:4200"})
public class ControlService{
    @Autowired
    private IDepartamentosService departamentosService;

    @GetMapping("/listarDepartamentos")
    /**
     * 
     * @return
     * Lista los departamentos
     */
    public List<Departamento> listarDepartamentos(){
        return this.departamentosService.listar();
    }

    /**
     * 
     * @param idDepartamento
     * @return
     * Lista las funciones por departamento
     */
    @GetMapping("/listarFuncionesDepartamento/{idDepartamento}")
    public List<Funciones> listarFuncionesDepartamento(@PathVariable long idDepartamento){
        return this.departamentosService.listarFunciones(idDepartamento);
    }

    /**
     * Guarda las funciones por departamento 
     */
    @PostMapping("/guardarFuncionesDepartamento")
    public List<Funciones> guardarFuncionesDepartamento(@RequestBody List<Funciones> funciones){
        return this.departamentosService.guardarFunciones(funciones);
    }
}