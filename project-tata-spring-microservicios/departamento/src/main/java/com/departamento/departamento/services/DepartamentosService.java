package com.departamento.departamento.services;

import java.util.List;

import com.departamento.departamento.daos.IDepartamentosDao;
import com.departamento.departamento.daos.IFuncionesDepartamentoDao;
import com.departamento.departamento.entities.Departamento;
import com.departamento.departamento.entities.Funciones;
import com.departamento.departamento.interfaces.IDepartamentosService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class DepartamentosService implements IDepartamentosService {

    @Autowired
    private IDepartamentosDao departamentoDao;

    @Autowired
    private IFuncionesDepartamentoDao funcionesDao;

    @Override
    @Transactional(readOnly = true)
    public List<Departamento> listar() {
        return this.departamentoDao.findAll();
    }

    @Override
    public List<Funciones> listarFunciones(long idDepartamento) {
        return this.funcionesDao.findByIdDepartamento(idDepartamento);
    }

    @Override
    public List<Funciones> guardarFunciones(List<Funciones> funciones) {
        for(Funciones funcion: funciones){
            this.funcionesDao.save(funcion);
        }

        return funciones;
    }

}